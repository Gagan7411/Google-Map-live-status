// ═══════════════════════════════════════════════════
// MFA Overlay — Clean Google-Style Biometric Scanner
// ═══════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyIdentity } from '../services/mfa';

export default function MFAOverlay({ isVisible, onVerified, onCancel }) {
    const [phase, setPhase] = useState('scanning');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isVisible) {
            setPhase('scanning');
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        verifyIdentity().then((result) => {
            setPhase('success');
            setTimeout(() => onVerified(result), 600);
        });

        return () => clearInterval(interval);
    }, [isVisible, onVerified]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ background: 'rgba(32, 33, 36, 0.6)', backdropFilter: 'blur(8px)' }}
                >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.92, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="bg-white rounded-2xl p-6 max-w-[340px] w-full text-center"
                        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}
                    >
                        {/* Scanner ring */}
                        <div className="relative w-28 h-28 mx-auto mb-5">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                                <circle
                                    cx="60" cy="60" r="52"
                                    fill="none"
                                    stroke="var(--color-surface-variant)"
                                    strokeWidth="4"
                                />
                                <motion.circle
                                    cx="60" cy="60" r="52"
                                    fill="none"
                                    stroke={phase === 'success' ? 'var(--color-g-green)' : 'var(--color-g-blue)'}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={326.726}
                                    strokeDashoffset={326.726 * (1 - progress / 100)}
                                    style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                                />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center">
                                {phase === 'success' ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-g-green)">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-g-blue)">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={phase}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                            >
                                <h2 className="text-lg font-semibold text-[var(--color-on-surface)] mb-1">
                                    {phase === 'scanning' ? 'Verifying identity' : 'Verified'}
                                </h2>
                                <p className="text-sm text-[var(--color-on-surface-variant)]">
                                    {phase === 'scanning'
                                        ? 'Hold still — scanning biometric data'
                                        : 'Identity confirmed. Applying changes.'}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress bar */}
                        <div className="mt-5 w-full h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-variant)' }}>
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: phase === 'success' ? 'var(--color-g-green)' : 'var(--color-g-blue)',
                                }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Cancel */}
                        {phase === 'scanning' && (
                            <button
                                id="mfa-cancel-btn"
                                onClick={onCancel}
                                className="mt-4 px-5 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer"
                                style={{ color: 'var(--color-g-blue)' }}
                            >
                                Cancel
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
