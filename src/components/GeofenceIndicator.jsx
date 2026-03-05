// ═══════════════════════════════════════════════════
// GeofenceIndicator — Google Maps Style Location Card
// ═══════════════════════════════════════════════════

import { motion } from 'framer-motion';

export default function GeofenceIndicator({
    isWithinFence,
    distance,
    isLoading,
    error,
    onRefresh,
    recruiterMode,
    calibrate,
}) {
    const statusColor = isLoading
        ? 'var(--color-g-yellow)'
        : isWithinFence
            ? 'var(--color-g-green)'
            : 'var(--color-g-red)';

    const statusBg = isLoading
        ? 'var(--color-g-yellow-light)'
        : isWithinFence
            ? 'var(--color-g-green-light)'
            : 'var(--color-g-red-light)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mat-card p-5"
        >
            {/* Section header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--color-g-blue)" />
                        <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                    <h2 className="text-sm font-semibold text-[var(--color-on-surface)]">
                        Location Verification
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={calibrate}
                        className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--color-g-blue-light)] text-[var(--color-g-blue)] border border-[var(--color-g-blue)] border-opacity-20 hover:bg-[var(--color-g-blue)] hover:text-white transition-all cursor-pointer mr-1"
                        title="Set current location as business HQ"
                    >
                        CALIBRATE
                    </button>
                    <button
                        id="geofence-refresh-btn"
                        onClick={onRefresh}
                        className="touch-target w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                        style={{ background: 'var(--color-surface-dim)' }}
                        title="Refresh location"
                    >
                        <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="var(--color-on-surface-subtle)"
                            animate={isLoading ? { rotate: 360 } : {}}
                            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
                        >
                            <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                        </motion.svg>
                    </button>
                </div>

            </div>

            {/* Status pill */}
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: statusBg }}
            >
                <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: statusColor }}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: statusColor }}>
                        {isLoading
                            ? 'Acquiring GPS signal…'
                            : isWithinFence
                                ? 'Within geofence — Authorized'
                                : 'Outside geofence — Restricted'}
                    </p>
                    {distance !== null && (
                        <p className="text-xs text-[var(--color-on-surface-subtle)] mt-0.5">
                            {distance}m from business • Geofence radius: 100m
                        </p>
                    )}
                </div>
            </div>

            {/* Distance meter */}
            {distance !== null && (
                <div className="mt-4">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-[var(--color-on-surface-subtle)]">Distance</span>
                        <span className="text-[11px] font-semibold" style={{ color: statusColor }}>
                            {distance}m / 100m
                        </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-variant)' }}>
                        <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((distance / 200) * 100, 100)}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            style={{
                                background: isWithinFence
                                    ? 'linear-gradient(90deg, #34A853, #1e8e3e)'
                                    : distance > 150
                                        ? 'linear-gradient(90deg, #FBBC05, #EA4335)'
                                        : 'linear-gradient(90deg, #FBBC05, #F9AB00)',
                            }}
                        />
                    </div>
                    {/* Scale markers */}
                    <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-[var(--color-on-surface-disabled)]">0m</span>
                        <span className="text-[10px] text-[var(--color-on-surface-disabled)]" style={{ position: 'relative', left: '-2%' }}>100m</span>
                        <span className="text-[10px] text-[var(--color-on-surface-disabled)]">200m</span>
                    </div>
                </div>
            )}

            {/* Recruiter Technical Blurb */}
            {recruiterMode && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 rounded-xl space-y-3"
                    style={{ background: 'var(--color-g-blue-light)', border: '1px solid rgba(26,115,232,0.15)' }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-g-blue)] animate-pulse" />
                        <span className="dev-label text-[var(--color-g-blue)]">Spatial Gate Protocol Active</span>
                    </div>
                    <p className="text-[11px] font-mono text-[var(--color-on-surface-variant)] leading-relaxed">
                        <strong className="text-[var(--color-g-blue)]">Haversine Validation</strong>: Proximity check against business coords <code className="bg-white px-1 rounded border border-[var(--color-outline)]">12.9716°N, 77.5946°E</code>.
                    </p>
                    <p className="text-[10px] text-[var(--color-on-surface-subtle)] italic">
                        State mutation mutations are authorized only within ≤100m radius of verified business perimeter.
                    </p>
                </motion.div>
            )}

        </motion.div>
    );
}
