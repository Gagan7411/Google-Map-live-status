// ═══════════════════════════════════════════════════
// MapPreview — Google Maps Realistic Listing Preview
// ═══════════════════════════════════════════════════

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STATUS, SHOP_COORDINATES } from '../constants';

export default function MapPreview({ status }) {
    const [activeTab, setActiveTab] = useState('after');
    const isOpen = status === STATUS.OPEN;

    // Determine display status based on tab
    const showOpen = activeTab === 'before' ? true : isOpen;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mat-card overflow-hidden"
        >
            {/* Section header */}
            <div className="px-5 pt-5 pb-3 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-g-green)">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                </svg>
                <h2 className="text-sm font-semibold text-[var(--color-on-surface)]">
                    Maps Listing Preview
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex px-5 mb-3">
                {['before', 'after'].map((tab) => (
                    <button
                        key={tab}
                        id={`map-tab-${tab}`}
                        onClick={() => setActiveTab(tab)}
                        className="flex-1 py-2 text-xs font-semibold transition-all cursor-pointer capitalize rounded-full"
                        style={{
                            background: activeTab === tab ? 'var(--color-g-blue-light)' : 'transparent',
                            color: activeTab === tab ? 'var(--color-g-blue)' : 'var(--color-on-surface-subtle)',
                        }}
                    >
                        {tab === 'before' ? 'Before Toggle' : 'After Toggle'}
                    </button>
                ))}
            </div>

            {/* Map Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeTab}-${status}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Simulated map */}
                    <div className="relative h-40 mx-5 rounded-xl overflow-hidden" style={{ background: '#e8eaed' }}>
                        {/* Map roads */}
                        <div className="absolute inset-0">
                            {/* Horizontal roads */}
                            <div className="absolute top-[35%] left-0 right-0 h-[3px]" style={{ background: '#ffffff' }} />
                            <div className="absolute top-[65%] left-0 right-0 h-[3px]" style={{ background: '#ffffff' }} />
                            {/* Vertical roads */}
                            <div className="absolute left-[25%] top-0 bottom-0 w-[3px]" style={{ background: '#ffffff' }} />
                            <div className="absolute left-[55%] top-0 bottom-0 w-[3px]" style={{ background: '#ffffff' }} />
                            <div className="absolute left-[80%] top-0 bottom-0 w-[2px]" style={{ background: '#ffffff' }} />
                            {/* Park area */}
                            <div className="absolute top-[10%] right-[5%] w-[18%] h-[25%] rounded-lg" style={{ background: '#c8e6c5' }} />
                            {/* Buildings */}
                            <div className="absolute top-[42%] left-[8%] w-[14%] h-[18%] rounded" style={{ background: '#dadce0' }} />
                            <div className="absolute top-[10%] left-[30%] w-[20%] h-[22%] rounded" style={{ background: '#dadce0' }} />
                            <div className="absolute top-[70%] left-[60%] w-[15%] h-[22%] rounded" style={{ background: '#dadce0' }} />
                            {/* Road labels */}
                            <div className="absolute top-[30%] left-[35%] text-[8px] font-medium text-[#80868b] -rotate-0">
                                MG Road
                            </div>
                            <div className="absolute top-[60%] left-[10%] text-[8px] font-medium text-[#80868b]">
                                Brigade Rd
                            </div>
                        </div>

                        {/* Google Maps Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10" style={{ transform: 'translate(-50%, -100%)' }}>
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <svg width="28" height="38" viewBox="0 0 28 38" fill="none">
                                    <path
                                        d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z"
                                        fill={showOpen ? '#34A853' : '#EA4335'}
                                    />
                                    <circle cx="14" cy="12" r="5" fill="white" />
                                    <circle cx="14" cy="12" r="2.5" fill={showOpen ? '#34A853' : '#EA4335'} />
                                </svg>
                            </motion.div>
                            {/* Pin shadow */}
                            <div className="w-3 h-1 rounded-full mx-auto -mt-0.5" style={{ background: 'rgba(0,0,0,0.15)' }} />
                        </div>

                        {/* Coordinates badge */}
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/80 text-[var(--color-on-surface-subtle)]">
                            {SHOP_COORDINATES.lat}°N, {SHOP_COORDINATES.lng}°E
                        </div>
                    </div>

                    {/* Business listing card */}
                    <div className="px-5 py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-[15px] font-semibold text-[var(--color-on-surface)]">
                                    ShopSwitch Demo Store
                                </h3>
                                <p className="text-xs text-[var(--color-on-surface-subtle)] mt-0.5">
                                    MG Road, Bengaluru, Karnataka 560001
                                </p>
                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-1.5">
                                    <span className="text-sm font-medium text-[var(--color-on-surface)]">4.2</span>
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < 4 ? '#F9AB00' : '#dadce0'}>
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs text-[var(--color-on-surface-subtle)]">(128)</span>
                                </div>
                            </div>
                            {/* Directions button */}
                            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'var(--color-g-blue-light)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-g-blue)">
                                    <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                                </svg>
                            </button>
                        </div>

                        {/* Status line */}
                        <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--color-outline)' }}>
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: showOpen ? 'var(--color-g-green)' : 'var(--color-g-red)' }}
                            />
                            <span
                                className="text-[13px] font-medium"
                                style={{ color: showOpen ? 'var(--color-g-green)' : 'var(--color-g-red)' }}
                            >
                                {showOpen ? 'Open' : 'Temporarily closed'}
                            </span>
                            <span className="text-[13px] text-[var(--color-on-surface-subtle)]">
                                · {showOpen ? 'Closes 10:00 pm' : 'Reopens after TTL'}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
