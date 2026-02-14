'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Trophy, Bot, FileWarning, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock templates for the carousel
const TEMPLATES = [
    { name: 'Finance', color: 'bg-slate-800' },
    { name: 'Creative', color: 'bg-purple-800' },
    { name: 'Tech', color: 'bg-blue-800' },
    { name: 'Academic', color: 'bg-emerald-800' },
];

export const DemoReel = () => {
    const [scene, setScene] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Visibility detection
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.6 }); // Play only when 60% visible

    // Timeline management
    useEffect(() => {
        // Pause if user clicked pause OR if component is off-screen
        if (isPaused || !isInView) return;

        const timings: (number | null)[] = [
            4000, // Scene 0: Hook 
            4000, // Scene 1: Solution 
            5000, // Scene 2: GoldenBot & Features (Extended for GoldenBot)
            4000, // Scene 3: Templates 
            null  // Scene 4: CTA
        ];

        let timer: NodeJS.Timeout;

        if (timings[scene] !== null) {
            timer = setTimeout(() => {
                setScene((prev) => (prev + 1) % 5);
            }, timings[scene] as number);
        } else {
            // Scene 4 (CTA) - Loop after delay (longer to read)
            timer = setTimeout(() => setScene(0), 8000);
        }

        return () => clearTimeout(timer);
    }, [scene, isPaused, isInView]);

    return (
        <div
            ref={containerRef}
            className="w-full h-[600px] bg-black relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl cursor-pointer group"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Click to Resume" : "Click to Pause"}
        >
            {/* Play/Pause/View Status Indicator */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                {!isInView && (
                    <div className="bg-black/50 backdrop-blur text-xs text-gray-400 px-3 py-1 rounded-full border border-white/10">
                        Paused (Off-screen)
                    </div>
                )}
                {isPaused && (
                    <div className="bg-red-500/20 text-xs text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                        Paused
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50 flex pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 h-full mx-[1px] bg-white/20">
                        {scene === i && !isPaused && isInView && (
                            <motion.div
                                className="h-full bg-lime-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: (i === 4 ? 8 : (i === 2 ? 5 : 4)), ease: "linear" }}
                            />
                        )}
                        {/* Show full bar if scene passed */}
                        {scene > i && <div className="h-full w-full bg-lime-400" />}
                        {/* Show static progress if paused */}
                        {scene === i && (isPaused || !isInView) && <div className="h-full bg-lime-400 w-1/3 opacity-50" />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {scene === 0 && (
                    <motion.div key="scene0" className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]" exit={{ opacity: 0 }}>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-black text-gray-500 text-center mb-8"
                        >
                            RESUME<br />BLACK HOLE?
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="absolute inset-0 bg-red-500/10 z-[-1] animate-pulse"
                        />
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="text-4xl md:text-6xl font-black text-red-500 uppercase tracking-tighter"
                        >
                            Stop Getting Rejected
                        </motion.h2>
                    </motion.div>
                )}

                {scene === 1 && (
                    <motion.div key="scene1" className="absolute inset-0 flex flex-col items-center justify-center bg-black" exit={{ opacity: 0 }}>
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
                            <h1 className="text-8xl font-black text-white tracking-tighter leading-none">RESUME</h1>
                            <h1 className="text-8xl font-black text-yellow-400 tracking-tighter leading-none">NUGGET</h1>
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 'auto' }}
                            className="mt-6 bg-lime-400 text-black px-8 py-3 text-2xl font-bold rounded-full overflow-hidden whitespace-nowrap"
                        >
                            AI-Powered Career Builder
                        </motion.div>
                    </motion.div>
                )}

                {scene === 2 && (
                    <motion.div key="scene2" className="absolute inset-0 flex flex-col items-center justify-center bg-black p-10" exit={{ opacity: 0 }}>
                        {/* GoldenBot Central Character */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="mb-12 relative"
                        >
                            <div className="w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)] animate-pulse">
                                <Bot size={64} className="text-yellow-400" />
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                            {[
                                { icon: Trophy, title: "Gamified", text: "Earn XP", color: "text-lime-400", bg: "bg-lime-400/10", border: "border-lime-400/20" },
                                { icon: Sparkles, title: "AI Magic", text: "Rewrite Text", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" }, // Updated middle card
                                { icon: FileWarning, title: "ATS Roast", text: "Fix Errors", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + (i * 0.2) }} // Stagger after bot appears
                                    className={`flex flex-col items-center p-6 rounded-2xl border ${feature.border} ${feature.bg} backdrop-blur-sm`}
                                >
                                    <feature.icon size={48} className={`mb-4 ${feature.color}`} />
                                    <h3 className="text-2xl font-bold text-white mb-1">{feature.title}</h3>
                                    <p className="text-gray-400 text-lg">{feature.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {scene === 3 && (
                    <motion.div key="scene3" className="absolute inset-0 flex flex-col items-center justify-center bg-[#111]" exit={{ opacity: 0 }}>
                        <h2 className="text-5xl font-bold text-white mb-10">Premium Templates</h2>
                        <div className="flex gap-6">
                            {TEMPLATES.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 300, opacity: 0, rotate: 10 }}
                                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                                    transition={{ delay: i * 0.1, type: "spring" }} // Faster stagger
                                    className={`w-48 h-64 ${t.color} rounded-xl shadow-2xl border border-white/10 flex items-end p-4`}
                                >
                                    <span className="text-white font-bold text-xl">{t.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {scene === 4 && (
                    <motion.div key="scene4" className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black" exit={{ opacity: 0 }}>
                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-7xl font-black text-center mb-12"
                        >
                            <span className="text-lime-400">BUILD YOUR</span><br />
                            <span className="text-white">LEGACY</span>
                        </motion.h1>
                        <Link href="/builder/resume/demo" onClick={(e) => e.stopPropagation()}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-lime-400 text-black px-10 py-5 rounded-full text-2xl font-bold cursor-pointer"
                            >
                                Get Started Free <ArrowRight size={24} />
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skip Button */}
            {scene !== 4 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setScene(4);
                    }}
                    className="absolute bottom-6 right-6 text-white/50 hover:text-white text-sm font-medium z-50 uppercase tracking-widest"
                >
                    Skip Intro
                </button>
            )}
        </div>
    );
};
