// ═══════════════════════════════════════════════════
// useShopStatus Hook — State + TTL Management
// ═══════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from 'react';
import { STATUS, TTL_OPTIONS } from '../constants';
import { patchBusinessStatus } from '../services/googleBusinessApi';
import { hashCoordinates } from '../services/geolocation';

const LOCATION_ID = 'shopswitch-demo-001';
const STORAGE_KEY = 'shopswitch_audit_log';

function loadAuditLog() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveAuditLog(log) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(-50)));
    } catch {
        // localStorage full — silently fail
    }
}

export function useShopStatus() {
    const [status, setStatus] = useState(STATUS.OPEN);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedTTL, setSelectedTTL] = useState(TTL_OPTIONS[0]);
    const [ttlExpiry, setTtlExpiry] = useState(null);
    const [ttlRemaining, setTtlRemaining] = useState(null);
    const [auditLog, setAuditLog] = useState(loadAuditLog);
    const [apiResponse, setApiResponse] = useState(null);
    const ttlTimerRef = useRef(null);
    const tickRef = useRef(null);

    // Persist audit log on change
    useEffect(() => {
        saveAuditLog(auditLog);
    }, [auditLog]);

    // TTL countdown ticker
    useEffect(() => {
        if (!ttlExpiry) {
            setTtlRemaining(null);
            return;
        }

        const tick = () => {
            const remaining = ttlExpiry - Date.now();
            if (remaining <= 0) {
                setTtlRemaining(null);
                setTtlExpiry(null);
            } else {
                setTtlRemaining(remaining);
            }
        };

        tick();
        tickRef.current = setInterval(tick, 1000);
        return () => clearInterval(tickRef.current);
    }, [ttlExpiry]);

    // --- Chrome Extension Bridge (Cross-Origin Message) ---
    const syncWithExtension = useCallback((newStatus, autoRevert = false, duration = 0) => {
        window.postMessage({
            type: 'SHOPSWITCH_STATUS_UPDATE',
            status: newStatus,
            autoRevertEnabled: autoRevert,
            revertDuration: duration
        }, "*"); // We target all because the extension injects here
        console.log('[ShopStatus] Broadcasted to Extension:', newStatus);
    }, []);

    // Initial sync
    useEffect(() => {
        syncWithExtension(status);
    }, []);

    /**
     * Toggle shop status with MFA-verified credentials.
     */
    const toggleStatus = useCallback(
        async (mfaResult, userCoords) => {
            if (!mfaResult?.isMFAVerified) {
                throw new Error('MFA verification required');
            }

            setIsTransitioning(true);
            const newStatus = status === STATUS.OPEN ? STATUS.CLOSED : STATUS.OPEN;

            try {
                const response = await patchBusinessStatus(LOCATION_ID, newStatus, mfaResult);
                setApiResponse(response);
                setStatus(newStatus);

                // Add audit log entry
                const entry = {
                    id: `evt_${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    event: `Status changed: ${status} → ${newStatus}`,
                    latLngHash: userCoords
                        ? hashCoordinates(userCoords.lat, userCoords.lng)
                        : 'N/A',
                    authMethod: mfaResult.method,
                    requestId: response.headers?.['x-request-id'] || `req_${Date.now()}`,
                };

                setAuditLog((prev) => [entry, ...prev]);

                // Set TTL timer if closing
                if (newStatus === STATUS.CLOSED) {
                    clearTimeout(ttlTimerRef.current);

                    let expiryTime;
                    let durationMinutes = 0;

                    if (selectedTTL.value === 'EOD') {
                        const now = new Date();
                        const eod = new Date(now);
                        eod.setHours(23, 59, 59, 999);
                        expiryTime = eod.getTime();
                        durationMinutes = (expiryTime - Date.now()) / 60000;
                    } else {
                        expiryTime = Date.now() + selectedTTL.value;
                        durationMinutes = selectedTTL.value / 60000;
                    }

                    setTtlExpiry(expiryTime);
                    ttlTimerRef.current = setTimeout(() => {
                        setStatus(STATUS.OPEN);
                        setTtlExpiry(null);
                        setTtlRemaining(null);

                        const revertEntry = {
                            id: `evt_${Date.now()}`,
                            timestamp: new Date().toISOString(),
                            event: `Auto-revert: CLOSED → OPEN (TTL expired: ${selectedTTL.shortLabel})`,
                            latLngHash: 'SYSTEM',
                            authMethod: 'TTL Auto-Revert',
                            requestId: `ttl_${Date.now()}`,
                        };
                        setAuditLog((prev) => [revertEntry, ...prev]);

                        // Sync "OPEN" back to extension
                        syncWithExtension(STATUS.OPEN);
                    }, expiryTime - Date.now());

                    // Final Broadcast to Extension
                    syncWithExtension(newStatus, true, durationMinutes);

                } else {
                    // Opening: clear any active TTL
                    clearTimeout(ttlTimerRef.current);
                    setTtlExpiry(null);
                    setTtlRemaining(null);

                    // Sync "OPEN" back to extension
                    syncWithExtension(STATUS.OPEN, false);
                }

                return response;
            } finally {
                setIsTransitioning(false);
            }
        },
        [status, selectedTTL, syncWithExtension]
    );

    const clearAuditLog = useCallback(() => {
        setAuditLog([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimeout(ttlTimerRef.current);
            clearInterval(tickRef.current);
        };
    }, []);

    return {
        status,
        isTransitioning,
        selectedTTL,
        setSelectedTTL,
        ttlRemaining,
        auditLog,
        apiResponse,
        toggleStatus,
        clearAuditLog,
    };
}
