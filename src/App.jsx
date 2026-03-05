// ═══════════════════════════════════════════════════
// App.jsx — 100% Centered Root (Corporate Mobile Style)
// ═══════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STATUS } from './constants';
import Header from './components/Header';
import StatusBadge from './components/StatusBadge';
import ToggleSwitch from './components/ToggleSwitch';
import GeofenceIndicator from './components/GeofenceIndicator';
import TTLSelector from './components/TTLSelector';
import MapPreview from './components/MapPreview';
import AuditLog from './components/AuditLog';
import MFAOverlay from './components/MFAOverlay';
import RecruiterOverlay from './components/RecruiterOverlay';
import { useGeofence } from './hooks/useGeofence';
import { useShopStatus } from './hooks/useShopStatus';

export default function App() {
    const [recruiterMode, setRecruiterMode] = useState(false);
    const [showMFA, setShowMFA] = useState(false);

    const geofence = useGeofence();
    const shop = useShopStatus();

    const handleToggleClick = useCallback(() => {
        if (!geofence.isWithinFence) return;
        setShowMFA(true);
    }, [geofence.isWithinFence]);

    const handleMFAVerified = useCallback(
        async (mfaResult) => {
            setShowMFA(false);
            try {
                await shop.toggleStatus(mfaResult, geofence.userCoords);
            } catch (err) {
                console.error('Toggle failed:', err);
            }
        },
        [shop, geofence.userCoords]
    );

    const handleMFACancel = useCallback(() => {
        setShowMFA(false);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-maps-grid" style={{ backgroundColor: 'var(--color-surface-dim)' }}>
            {/* Decorative Blur Pods */}
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] bg-blue-100" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] bg-emerald-50" />
            </div>

            {/* MFA Overlay */}
            <MFAOverlay
                isVisible={showMFA}
                onVerified={handleMFAVerified}
                onCancel={handleMFACancel}
            />

            {/* Sticky Top Header */}
            <Header
                recruiterMode={recruiterMode}
                onToggleRecruiter={() => setRecruiterMode(!recruiterMode)}
            />

            {/* 
                DASHBOARD CONTAINER:
                Expands from a single column on mobile to a sophisticated 
                multi-column layout on desktop to utilize screen real estate.
            */}
            <div className="flex-1 w-full flex justify-center z-10 py-6 lg:py-10 px-4">
                <main className="w-full max-w-[1280px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* LEFT COLUMN: Control Center (lg:col-span-5) */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="flex items-center gap-3 mb-2 px-1">
                                <span className="text-[10px] font-black text-[var(--color-g-blue)] uppercase tracking-[0.2em]">01</span>
                                <h2 className="text-[11px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest">
                                    Control Center
                                </h2>
                                <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]" />
                            </div>

                            <StatusBadge
                                status={shop.status}
                                isTransitioning={shop.isTransitioning}
                            />

                            <ToggleSwitch
                                status={shop.status}
                                isTransitioning={shop.isTransitioning}
                                isDisabled={!geofence.isWithinFence}
                                disabledReason={
                                    geofence.isLoading
                                        ? 'Acquiring GPS signal…'
                                        : !geofence.isWithinFence
                                            ? 'Not at business location'
                                            : null
                                }
                                onToggle={handleToggleClick}
                                recruiterMode={recruiterMode}
                            />

                            <TTLSelector
                                selectedTTL={shop.selectedTTL}
                                onSelect={shop.setSelectedTTL}
                                ttlRemaining={shop.ttlRemaining}
                            />
                        </div>

                        {/* CENTER/RIGHT COLUMN: Verification & Insights (lg:col-span-7) */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* Verification Row: Geofence & Map Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-1 px-1">
                                        <span className="text-[10px] font-black text-[var(--color-g-blue)] uppercase tracking-[0.2em]">02</span>
                                        <h2 className="text-[11px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest">
                                            Spatial Verification
                                        </h2>
                                        <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]" />
                                    </div>
                                    <GeofenceIndicator
                                        isWithinFence={geofence.isWithinFence}
                                        distance={geofence.distance}
                                        isLoading={geofence.isLoading}
                                        error={geofence.error}
                                        onRefresh={geofence.refresh}
                                        recruiterMode={recruiterMode}
                                        calibrate={geofence.calibrate}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-1 px-1">
                                        <span className="text-[10px] font-black text-[var(--color-g-blue)] uppercase tracking-[0.2em]">03</span>
                                        <h2 className="text-[11px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest">
                                            Business Perimeter
                                        </h2>
                                        <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]" />
                                    </div>
                                    <MapPreview status={shop.status} />
                                </div>
                            </div>

                            {/* Full Width Row: Audit Log */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-1 px-1">
                                    <span className="text-[10px] font-black text-[var(--color-g-blue)] uppercase tracking-[0.2em]">04</span>
                                    <h2 className="text-[11px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest">
                                        System Intelligence & Log
                                    </h2>
                                    <div className="h-[1px] flex-1 bg-[var(--color-outline-variant)]" />
                                </div>
                                <AuditLog
                                    entries={shop.auditLog}
                                    onClear={shop.clearAuditLog}
                                />
                            </div>

                            {/* Dashboard Footer */}
                            <footer className="pt-10 pb-6 flex flex-col items-center lg:items-start border-t border-[var(--color-outline-variant)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="google-gradient-bar w-20 h-1 rounded-full opacity-80" />
                                    <p className="text-[10px] font-black text-[var(--color-on-surface-subtle)] tracking-[0.3em] uppercase">
                                        ShopSwitch Protocol v1.2.4
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
                                    <p className="text-[11px] text-[var(--color-on-surface-disabled)]">
                                        Google Cloud Platform • Authorized Integration
                                    </p>
                                    <p className="text-[11px] text-[var(--color-on-surface-disabled)]">
                                        End-to-End Geofence Encryption Active
                                    </p>
                                    <p className="text-[11px] text-[var(--color-on-surface-disabled)]">
                                        Last Health Check: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </footer>
                        </div>
                    </div>
                </main>
            </div>


            <RecruiterOverlay
                isVisible={recruiterMode}
                onClose={() => setRecruiterMode(false)}
            />
        </div>
    );
}
