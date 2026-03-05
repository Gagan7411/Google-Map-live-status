// ═══════════════════════════════════════════════════
// StatusBadge — Google-style OPEN/CLOSED Indicator
// ═══════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { STATUS } from '../constants';

export default function StatusBadge({ status, isTransitioning }) {
    const isOpen = status === STATUS.OPEN;

    return (
        <motion.div
            layout
            className="mat-card overflow-hidden relative"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background Gradient Mesh */}
            <div
                className="absolute inset-x-0 top-0 h-24 opacity-10 blur-3xl pointer-events-none"
                style={{
                    background: isOpen
                        ? 'radial-gradient(circle, var(--color-g-green) 0%, transparent 70%)'
                        : 'radial-gradient(circle, var(--color-g-red) 0%, transparent 70%)'
                }}
            />

            <div className="p-6 lg:p-8 flex flex-col items-center text-center relative z-10">
                {/* Status Verified Chip */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--color-outline-variant)] shadow-sm mb-6">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isOpen ? 'var(--color-g-green)' : 'var(--color-g-red)' }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-on-surface-subtle)]">
                        System Verified
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-g-blue)">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </div>

                {/* Main Status Text */}
                <div className="relative mb-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-4"
                        >
                            <h1
                                className="text-7xl font-black tracking-tighter leading-none"
                                style={{
                                    color: isOpen ? 'var(--color-g-green)' : 'var(--color-g-red)',
                                    textShadow: isOpen ? '0 10px 40px rgba(30,142,62,0.15)' : '0 10px 40px rgba(217,48,37,0.15)'
                                }}
                            >
                                {isTransitioning ? '...' : status}
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <p className="text-sm font-medium text-[var(--color-on-surface-variant)] max-w-[200px] leading-snug">
                    {isOpen
                        ? 'Operational: Accepting customer traffic'
                        : 'Standby: Business currently offline'}
                </p>

                {/* Pulsing indicator ring */}
                <div className="absolute top-8 right-8">
                    <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: isOpen ? 'var(--color-g-green)' : 'var(--color-g-red)' }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
