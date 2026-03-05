// ═══════════════════════════════════════════════════
// useGeofence Hook — Reactive Spatial Gate
// ═══════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import { getCurrentPosition, haversineDistance } from '../services/geolocation';
import { SHOP_COORDINATES } from '../constants';

export function useGeofence() {
    const [shopCoords, setShopCoords] = useState(SHOP_COORDINATES);
    const [state, setState] = useState({
        userCoords: null,
        isWithinFence: false,
        distance: null,
        isLoading: true,
        error: null,
        lastChecked: null,
    });

    const checkLocation = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const coords = await getCurrentPosition();
            const distance = Math.round(haversineDistance(
                coords.lat,
                coords.lng,
                shopCoords.lat,
                shopCoords.lng
            ));

            const isWithinFence = distance <= 100; // 100m radius

            setState({
                userCoords: coords,
                isWithinFence,
                distance,
                isLoading: false,
                error: null,
                lastChecked: new Date().toISOString(),
            });
        } catch (err) {
            // For demo: simulate being near the shopCoords
            const mockCoords = {
                lat: shopCoords.lat + 0.0001, // ~11m away
                lng: shopCoords.lng,
            };

            const distance = Math.round(haversineDistance(
                mockCoords.lat,
                mockCoords.lng,
                shopCoords.lat,
                shopCoords.lng
            ));

            setState({
                userCoords: mockCoords,
                isWithinFence: distance <= 100,
                distance,
                isLoading: false,
                error: `Geolocation unavailable (using demo coordinates). ${err.message}`,
                lastChecked: new Date().toISOString(),
            });
        }
    }, [shopCoords]);

    const calibrate = useCallback(async () => {
        try {
            const coords = await getCurrentPosition();
            setShopCoords(coords);
            // Re-check proximity immediately after calibrating target
            setTimeout(() => checkLocation(), 100);
            return true;
        } catch (err) {
            console.error('Calibration failed:', err);
            return false;
        }
    }, [checkLocation]);

    useEffect(() => {
        checkLocation();

        // Re-check every 30 seconds
        const interval = setInterval(checkLocation, 30000);
        return () => clearInterval(interval);
    }, [checkLocation]);

    return { ...state, shopCoords, refresh: checkLocation, calibrate };
}
