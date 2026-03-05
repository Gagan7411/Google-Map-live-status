// ═══════════════════════════════════════════════════
// Geolocation Service — Spatial Gate Logic
// ═══════════════════════════════════════════════════
// Implements the Haversine formula for distance
// calculation between two geographic coordinates.

import { SHOP_COORDINATES, GEOFENCE_RADIUS_METERS } from '../constants';

/**
 * Calculate the Haversine distance between two lat/lng points.
 * @returns {number} Distance in meters.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Check if given coordinates are within the geofence radius.
 * @param {number} userLat
 * @param {number} userLng
 * @returns {{ isWithinFence: boolean, distance: number }}
 */
export function checkGeofence(userLat, userLng) {
    const distance = haversineDistance(
        userLat,
        userLng,
        SHOP_COORDINATES.lat,
        SHOP_COORDINATES.lng
    );

    return {
        isWithinFence: distance <= GEOFENCE_RADIUS_METERS,
        distance: Math.round(distance),
    };
}

/**
 * Request the user's current geolocation using the Browser API.
 * @returns {Promise<{ lat: number, lng: number }>}
 */
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000,
            }
        );
    });
}

/**
 * Hash lat/lng for audit log privacy.
 * @returns {string} Truncated coordinate hash.
 */
export function hashCoordinates(lat, lng) {
    const str = `${lat.toFixed(4)}_${lng.toFixed(4)}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return `0x${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}
