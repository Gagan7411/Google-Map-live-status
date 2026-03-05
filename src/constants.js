// ═══════════════════════════════════════════════════
// ShopSwitch Constants — Single Source of Truth
// ═══════════════════════════════════════════════════

/** Hardcoded shop coordinates (Bengaluru, India) */
export const SHOP_COORDINATES = {
    lat: 12.9716,
    lng: 77.5946,
    label: 'ShopSwitch HQ — Bengaluru',
};

/** Maximum allowed distance from shop (meters) */
export const GEOFENCE_RADIUS_METERS = 100;

/** TTL presets for automatic status revert */
export const TTL_OPTIONS = [
    { label: '1 Hour', value: 60 * 60 * 1000, shortLabel: '1h' },
    { label: '2 Hours', value: 2 * 60 * 60 * 1000, shortLabel: '2h' },
    { label: '4 Hours', value: 4 * 60 * 60 * 1000, shortLabel: '4h' },
    { label: 'End of Day', value: 'EOD', shortLabel: 'EOD' },
];

/** Status enum */
export const STATUS = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
};

/** Auth methods for audit log */
export const AUTH_METHODS = {
    BIOMETRIC: 'Biometric/FaceID',
    PIN: 'PIN Fallback',
};
