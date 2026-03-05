// ═══════════════════════════════════════════════════
// Header — Google Professional Sticky Bar
// ═══════════════════════════════════════════════════

import { motion } from 'framer-motion';

export default function Header({ recruiterMode, onToggleRecruiter }) {
    return (
        <motion.header
            initial={{ y: -64 }}
            animate={{ y: 0 }}
            className="sticky-header w-full sticky top-0 z-40 py-3"
        >
            {/* 
                This div is the anchor for centering the header content 
                to match the main card stack width below it.
            */}
            <div
                className="mx-auto flex items-center justify-between px-4"
                style={{ maxWidth: '1280px' }}
            >

                {/* Logo & Identity */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-g-blue)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />
                            <circle cx="12" cy="9" r="2.5" fill="var(--color-g-blue)" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-[16px] font-bold text-[var(--color-on-surface)] leading-none truncate">
                            ShopSwitch
                        </h1>
                        <p className="text-[11px] text-[var(--color-on-surface-subtle)] font-medium mt-1 truncate">
                            Authorized Business Toggle
                        </p>
                    </div>
                </div>

                {/* Professional Tech Toggle */}
                <button
                    id="recruiter-toggle"
                    onClick={onToggleRecruiter}
                    className="touch-target px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 cursor-pointer border flex-shrink-0"
                    style={{
                        background: recruiterMode ? 'var(--color-g-blue)' : 'var(--color-surface)',
                        color: recruiterMode ? '#fff' : 'var(--color-g-blue)',
                        borderColor: recruiterMode ? 'var(--color-g-blue)' : 'var(--color-outline)',
                        boxShadow: recruiterMode ? '0 4px 12px rgba(26,115,232,0.3)' : 'none',
                    }}
                >
                    {recruiterMode ? '✦ Tech Mode: ON' : '◇ Tech Details'}
                </button>
            </div>
        </motion.header>
    );
}
