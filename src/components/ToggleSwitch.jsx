// ═══════════════════════════════════════════════════
// ToggleSwitch — Redesigned Action Card
// ═══════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { STATUS } from '../constants';

export default function ToggleSwitch({
    status,
    isTransitioning,
    isDisabled,
    disabledReason,
    onToggle,
    recruiterMode,
}) {
    const isOpen = status === STATUS.OPEN;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mat-card overflow-hidden"
        >
            <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-2 h-5 bg-[var(--color-g-blue)] rounded-full" />
                            <h2 className="text-lg font-black tracking-tight text-[var(--color-on-surface)]">
                                Live Switch
                            </h2>
                        </div>
                        <p className="text-[11px] font-bold text-[var(--color-on-surface-subtle)] uppercase tracking-widest pl-4">
                            Authorized Status Override
                        </p>
                    </div>
                    <div className="bg-[var(--color-surface-variant)] px-2 py-1 rounded text-[9px] font-black text-[var(--color-on-surface-variant)] uppercase tracking-tighter shadow-inner">
                        Secure PATCH: v2.1
                    </div>
                </div>

                {/* Toggle UI Area */}
                <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-dim)] group hover:border-[var(--color-g-blue)] hover:bg-white transition-all">
                    <div className="min-w-0 pr-4">
                        <p className="text-sm font-black text-[var(--color-on-surface)]">
                            {isOpen ? 'Currently Online' : 'Currently Offline'}
                        </p>
                        <p className="text-[11px] text-[var(--color-on-surface-subtle)] mt-1 font-medium leading-tight">
                            {isDisabled
                                ? 'Security Gate Active: Action restricted'
                                : `Authorization ready. Click to switch to ${isOpen ? 'Standby' : 'Live'} mode.`}
                        </p>
                    </div>

                    <button
                        id="main-toggle-btn"
                        onClick={onToggle}
                        disabled={isDisabled || isTransitioning}
                        className="relative w-[64px] h-[36px] flex-shrink-0 rounded-full transition-all duration-500 cursor-pointer touch-target focus:outline-none shadow-sm overflow-hidden"
                        style={{
                            background: isDisabled
                                ? 'var(--color-outline)'
                                : isOpen
                                    ? 'linear-gradient(135deg, var(--color-g-green), #2d9249)'
                                    : 'linear-gradient(135deg, var(--color-g-red), #b7281f)',
                        }}
                    >
                        {/* Glass Overlay for depth */}
                        <div className="absolute inset-0 bg-white opacity-10 pointer-events-none" />

                        <motion.div
                            className="absolute top-[3px] w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.25)] z-10"
                            animate={{
                                left: isOpen ? '31px' : '3px',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            {isTransitioning && (
                                <motion.div
                                    className="w-4 h-4 border-2 rounded-full"
                                    style={{ borderColor: 'var(--color-g-blue)', borderTopColor: 'transparent' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                />
                            )}
                        </motion.div>
                    </button>
                </div>

                {/* Verification Status Banner */}
                <AnimatePresence mode="wait">
                    {isDisabled && (
                        <motion.div
                            key="disabled-banner"
                            initial={{ height: 0, opacity: 0, mt: 0 }}
                            animate={{ height: 'auto', opacity: 1, mt: 16 }}
                            exit={{ height: 0, opacity: 0, mt: 0 }}
                            className="mt-4 px-4 py-3 rounded-xl border flex items-center gap-3 bg-[var(--color-g-red-light)] border-[rgba(217,48,37,0.1)]"
                        >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-g-red)">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[12px] font-bold text-[var(--color-g-red-dark)]">Toggle Restricted</p>
                                <p className="text-[11px] text-[var(--color-g-red-dark)] opacity-90 truncate">{disabledReason}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recruiter Technical Insight */}
            {recruiterMode && (
                <div className="px-6 py-4 border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-dim)]">
                    <p className="text-[10px] font-mono text-[var(--color-on-surface-subtle)] leading-relaxed">
                        <strong className="text-[var(--color-g-blue)]">ARCHITECTURE_NOTE:</strong> Verification involves a zero-trust handshake.
                        The toggle is blocked at the Component, Hook, AND Service layers.
                        State: {isOpen ? 'AUTH_OPEN' : 'AUTH_CLOSED'} | Geofence: {isDisabled ? 'BLOCK' : 'PASS'}
                    </p>
                </div>
            )}
        </motion.div>
    );
}
