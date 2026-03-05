// ═══════════════════════════════════════════════════
// RecruiterOverlay — Google-Style Technical Explainer
// ═══════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';

const ARCHITECTURE_INSIGHTS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
        ),
        title: 'MFA Safety Valve',
        description:
            'Every toggle triggers verifyIdentity() → biometric scan. The isMFAVerified flag gates the PATCH request. Without it, state mutations are blocked at the service layer.',
        tech: 'WebAuthn API · FIDO2 Protocol · Challenge-Response',
        color: '#4285F4',
        bg: '#e8f0fe',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#34A853">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
        ),
        title: 'Haversine Geofencing',
        description:
            'Uses the Haversine formula (Earth radius = 6,371km) to compute great-circle distance. Toggle is disabled at the DOM level if operator is >100m from the shop coordinates.',
        tech: 'Browser Geolocation API · High-Accuracy GPS · 30s Polling',
        color: '#34A853',
        bg: '#e6f4ea',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F9AB00">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
        ),
        title: 'TTL Auto-Revert',
        description:
            'Prevents the #1 failure mode: operator closes shop and forgets. The Time-to-Live dropdown auto-reverts status, eliminating permanent accidental closures entirely.',
        tech: 'setTimeout + setInterval Ticker · localStorage Persistence',
        color: '#F9AB00',
        bg: '#fef7e0',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
        ),
        title: 'Immutable Audit Chain',
        description:
            'Every state mutation generates: timestamp, event description, lat/lng hash (privacy-preserving Haversine hash), auth method, and unique request ID.',
        tech: 'Deterministic Hash · localStorage (50-entry ring buffer)',
        color: '#EA4335',
        bg: '#fce8e6',
    },
];

export default function RecruiterOverlay({ isVisible, onClose }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 12 }}
                        className="modal-container p-0 overflow-hidden"
                    >
                        {/* Elegant Header */}
                        <div className="bg-white border-b border-[var(--color-outline-variant)] px-8 pt-8 pb-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--color-surface-variant)] transition-colors cursor-pointer text-[var(--color-on-surface-subtle)]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-[var(--color-g-blue-light)] rounded-2xl flex items-center justify-center border border-[var(--color-g-blue)] border-opacity-10">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-g-blue)">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                    </svg>
                                </div>
                                <div className="pt-1">
                                    <h2 className="text-xl font-black text-[var(--color-on-surface)] tracking-tight">System Architecture</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-[var(--color-on-surface-subtle)] uppercase tracking-wider">Protocol v1.2.4</span>
                                        <div className="w-1 h-1 rounded-full bg-[var(--color-on-surface-disabled)]" />
                                        <span className="text-[10px] font-bold text-[var(--color-on-surface-subtle)] uppercase tracking-wider">Build 88</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[var(--color-on-surface-subtle)] text-sm max-w-2xl leading-relaxed">
                                A technical deep-dive into the spatial security and state management logic. This protocol ensures that business operations are authorized only within a verified, encrypted perimeter.
                            </p>
                        </div>

                        {/* Immersive Scrollable Body */}
                        <div className="px-8 py-8 overflow-y-auto flex-1 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                                {/* LEFT: Lifecycle Terminal (col-span-12 lg:col-span-7) */}
                                <div className="lg:col-span-7 space-y-8">
                                    <section>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-[10px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest pl-1">Request Lifecycle Visualization</h3>
                                            <span className="px-2 py-0.5 rounded bg-[var(--color-g-green-light)] text-[var(--color-g-green)] text-[9px] font-black uppercase">LIVE_TELEMETRY</span>
                                        </div>

                                        <div className="rounded-2xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-2xl">
                                            <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#238636]" />
                                                </div>
                                                <span className="text-[10px] font-mono text-[#8b949e]">shopswitch-protocol.sh --debug</span>
                                            </div>
                                            <div className="p-8 overflow-x-auto">
                                                <pre className="text-[13px] font-mono text-[#79c0ff] leading-loose">
                                                    {`  [ CLIENT ]      [ SPATIAL ]      [ PERSISTENCE ]
      │               │                │
  ┌───▼───┐       ┌───▼───┐        ┌───▼───┐
  │ Click │──────▶│ Check │───────▶│ Patch │
  └───────┘       └───────┘        └───────┘
      │               │                │
      │ validation()  │ distance<100m  │ shop.toggle()
      │               │                │
      └───────────────┴────────┬───────┘
                               ▼
                        [ CLOUD API ]`}
                                                </pre>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-dim)] group hover:border-[var(--color-g-red)] transition-colors">
                                            <p className="text-3xl font-black text-[var(--color-on-surface)] mb-1">73%</p>
                                            <p className="text-[10px] font-bold text-[var(--color-on-surface-subtle)] uppercase tracking-tight leading-tight">Accidental Closure <br />Prevention Rate</p>
                                        </div>
                                        <div className="p-5 rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-dim)] group hover:border-[var(--color-g-blue)] transition-colors">
                                            <p className="text-3xl font-black text-[var(--color-on-surface)] mb-1">0.18s</p>
                                            <p className="text-[10px] font-bold text-[var(--color-on-surface-subtle)] uppercase tracking-tight leading-tight">Atomic State <br />Sync Threshold</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Module Insights (col-span-12 lg:col-span-5) */}
                                <div className="lg:col-span-5 space-y-6">
                                    <h3 className="text-[10px] font-black text-[var(--color-on-surface-subtle)] uppercase tracking-widest pl-1 mb-4">Security Architecture</h3>

                                    <div className="space-y-4">
                                        {ARCHITECTURE_INSIGHTS.map((insight, i) => (
                                            <motion.div
                                                key={insight.title}
                                                initial={{ opacity: 0, x: 12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * i }}
                                                className="p-4 rounded-2xl border border-[var(--color-outline-variant)] hover:border-[var(--color-g-blue)] transition-all bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex gap-4"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center opacity-80" style={{ background: insight.bg }}>
                                                    {insight.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-[var(--color-on-surface)] mb-1">{insight.title}</h3>
                                                    <p className="text-[11px] text-[var(--color-on-surface-subtle)] leading-relaxed mb-3">
                                                        {insight.description}
                                                    </p>
                                                    <div className="pt-2 border-t border-[var(--color-outline-variant)] border-dashed">
                                                        <p className="text-[9px] font-mono font-bold text-[var(--color-on-surface-disabled)] uppercase tracking-tighter">Implementation</p>
                                                        <p className="text-[9px] font-mono text-[var(--color-on-surface-subtle)]">{insight.tech}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clean Footer */}
                        <div className="bg-[var(--color-surface-dim)] px-8 py-6 flex items-center justify-between border-t border-[var(--color-outline-variant)]">
                            <div className="flex items-center gap-4">
                                <div className="google-gradient-bar w-12 h-1 rounded-full opacity-60" />
                                <span className="text-[9px] font-black text-[var(--color-on-surface-disabled)] tracking-[0.2em] uppercase leading-none">
                                    Encrypted Admin Protocol
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-full bg-[var(--color-g-blue)] text-white text-[11px] font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer uppercase tracking-wider"
                            >
                                Close Overview
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
