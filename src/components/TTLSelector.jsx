// ═══════════════════════════════════════════════════
// TTLSelector — Google Material Style Dropdown
// ═══════════════════════════════════════════════════

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TTL_OPTIONS } from '../constants';

function formatRemaining(ms) {
    if (!ms || ms <= 0) return '00:00:00';
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TTLSelector({ selectedTTL, onSelect, ttlRemaining }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mat-card overflow-hidden"
        >
            <div className="p-5 lg:p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-g-yellow-light)] flex items-center justify-center border border-[var(--color-g-yellow)] border-opacity-10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-g-yellow)">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-[var(--color-on-surface)]">
                                Auto-Revert Duration
                            </h2>
                            <p className="text-[11px] text-[var(--color-on-surface-subtle)] font-medium">
                                System safety: Auto-reopen protocol
                            </p>
                        </div>
                    </div>

                    {ttlRemaining > 0 && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[var(--color-g-red-light)] px-3 py-1.5 rounded-lg border border-[var(--color-g-red)] border-opacity-10"
                        >
                            <span className="text-[12px] font-mono font-black text-[var(--color-g-red)]">
                                {formatRemaining(ttlRemaining)}
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Duration Control: PRO Chip List */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                    {TTL_OPTIONS.map((option) => {
                        const isSelected = selectedTTL.shortLabel === option.shortLabel;
                        return (
                            <button
                                key={option.shortLabel}
                                onClick={() => onSelect(option)}
                                className={`flex-1 min-w-[80px] px-3 py-3 rounded-xl text-center transition-all cursor-pointer border ${isSelected
                                    ? 'bg-[var(--color-g-blue)] border-[var(--color-g-blue)] text-white shadow-md shadow-blue-100'
                                    : 'bg-[var(--color-surface-dim)] border-[var(--color-outline-variant)] text-[var(--color-on-surface-subtle)] hover:border-[var(--color-g-blue)] hover:bg-white'
                                    }`}
                            >
                                <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : ''}`}>
                                    {option.shortLabel}
                                </span>
                                <p className={`text-[9px] font-bold mt-0.5 opacity-60 ${isSelected ? 'text-white' : ''}`}>
                                    {option.label.split(' ')[0]}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Active Countdown Progress */}
                {ttlRemaining > 0 && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] uppercase font-bold text-[var(--color-on-surface-subtle)] tracking-widest">Protocol Countdown</span>
                            <span className="text-[10px] font-black text-[var(--color-g-blue)]">EXPIRING</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[var(--color-g-blue)]"
                                initial={{ width: '100%' }}
                                animate={{ width: `${Math.max((ttlRemaining / selectedTTL.value) * 100, 0)}%` }}
                                transition={{ ease: 'linear' }}
                            />
                        </div>
                    </div>
                )}

                {/* Pro Insight Footer */}
                <div className="flex gap-3 p-3.5 rounded-xl bg-[var(--color-surface-dim)] border border-[var(--color-outline-variant)] border-dashed">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[var(--color-outline-variant)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-on-surface-subtle)">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                    <p className="text-[11px] text-[var(--color-on-surface-subtle)] leading-relaxed italic">
                        <strong>Security Core</strong>: Closing a business manually creates "Hours Gap" risk. This toggle implements an auto-reopening state to ensure visibility restoration after the planned duration.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
