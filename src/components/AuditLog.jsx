// ═══════════════════════════════════════════════════
// AuditLog — Clean Material Design Event History
// ═══════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';

function formatTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export default function AuditLog({ entries, onClear }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mat-card p-5"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-on-surface-variant)">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-[var(--color-on-surface)]">
                        Audit Log
                    </h2>
                    {entries.length > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-surface-variant)', color: 'var(--color-on-surface-variant)' }}>
                            {entries.length}
                        </span>
                    )}
                </div>

                {entries.length > 0 && (
                    <button
                        id="clear-audit-btn"
                        onClick={onClear}
                        className="text-xs font-medium cursor-pointer transition-colors touch-target px-2"
                        style={{ color: 'var(--color-g-red)' }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Entries */}
            <div className="max-h-72 overflow-y-auto space-y-2" style={{ scrollbarWidth: 'thin' }}>
                {entries.length === 0 ? (
                    <div className="py-10 text-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-on-surface-disabled)" className="mx-auto mb-3">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        <p className="text-sm text-[var(--color-on-surface-subtle)]">
                            No events recorded
                        </p>
                        <p className="text-xs text-[var(--color-on-surface-disabled)] mt-1">
                            Toggle the business status to see audit entries
                        </p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {entries.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.03 }}
                                className="rounded-xl p-3.5 border border-[var(--color-outline-variant)]"
                                style={{ background: 'var(--color-surface-dim)' }}
                            >
                                {/* Top row: time + event */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono font-semibold text-[var(--color-g-blue)]">
                                        {formatTime(entry.timestamp)}
                                    </span>
                                    <span className="text-[11px] text-[var(--color-on-surface-subtle)]">
                                        {formatDate(entry.timestamp)}
                                    </span>
                                </div>

                                <p className="text-[13px] font-medium text-[var(--color-on-surface)] mb-2.5">
                                    {entry.event}
                                </p>

                                {/* Meta grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 pt-3 border-t border-[var(--color-outline-variant)]">
                                    <div className="space-y-1">
                                        <label className="dev-label block opacity-60">Location Hash</label>
                                        <p className="text-[10px] font-mono text-[var(--color-on-surface-variant)] truncate">
                                            {entry.latLngHash}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="dev-label block opacity-60">Auth Method</label>
                                        <p className="text-[11px] font-bold text-[var(--color-on-surface-variant)] uppercase tracking-tighter">
                                            {entry.authMethod}
                                        </p>
                                    </div>
                                    <div className="space-y-1 xl:col-span-2">
                                        <label className="dev-label block opacity-60">Request ID</label>
                                        <p className="text-[10px] font-mono text-[var(--color-g-blue)] truncate">
                                            {entry.requestId}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
}
