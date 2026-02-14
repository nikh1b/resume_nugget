'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATE_INFO, TemplateName } from '@/components/pdf-templates';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TemplatePreview = ({ name }: { name: TemplateName }) => {
    // Determine style category based on name
    const isTech = ['tech', 'engineering', 'saas'].includes(name);
    const isSidebar = ['modern', 'designer', 'executive'].includes(name);
    const isCreative = ['creative', 'marketing', 'bold'].includes(name);
    const isMinimal = ['minimalist', 'pure', 'ivy', 'classic'].includes(name);

    return (
        <div className={cn(
            "w-40 h-56 shadow-2xl flex flex-col transform group-hover:scale-105 transition-transform duration-500 origin-bottom overflow-hidden relative",
            isTech ? "bg-[#1e1e1e]" : "bg-white"
        )}>
            {/* Header / Top Section */}
            {isTech ? (
                <div className="h-4 w-full bg-[#2d2d2d] flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
            ) : isCreative ? (
                <div className="h-16 w-full bg-blue-600/90 relative overflow-hidden">
                    <div className="absolute -right-4 -top-8 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                </div>
            ) : isSidebar ? (
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 border-r border-gray-200" />
            ) : (
                <div className="h-8 w-full mt-4 flex justify-center flex-col items-center gap-1">
                    <div className="h-2 w-16 bg-gray-800 rounded-sm" />
                    <div className="h-1 w-24 bg-gray-300 rounded-sm" />
                </div>
            )}

            {/* Content Body */}
            <div className={cn("flex-1 p-3 flex flex-col gap-2 relative z-10", isSidebar && "pl-14")}>
                {!isMinimal && !isCreative && !isTech && (
                    <div className="h-4 w-20 bg-gray-800 rounded-sm mb-2" />
                )}

                {/* Tech Code Lines */}
                {isTech ? (
                    <div className="space-y-1.5 mt-2">
                        <div className="h-1 w-16 bg-blue-400/40 rounded-sm" />
                        <div className="h-1 w-24 bg-green-400/40 rounded-sm pl-2" />
                        <div className="h-1 w-20 bg-orange-400/40 rounded-sm pl-2" />
                        <div className="h-1 w-10 bg-purple-400/40 rounded-sm" />
                    </div>
                ) : (
                    // Standard Lines
                    <>
                        <div className={cn("h-1 w-full rounded-sm", isTech ? "bg-gray-700" : "bg-gray-200")} />
                        <div className={cn("h-1 w-full rounded-sm", isTech ? "bg-gray-700" : "bg-gray-200")} />
                        <div className={cn("h-1 w-2/3 rounded-sm", isTech ? "bg-gray-700" : "bg-gray-200")} />

                        <div className={cn("mt-2 pt-2 border-t space-y-1.5", isTech ? "border-gray-700" : "border-gray-100")}>
                            <div className={cn("h-1.5 w-8 rounded-sm", isTech ? "bg-gray-600" : "bg-gray-300")} />
                            <div className={cn("h-1 w-full rounded-sm", isTech ? "bg-gray-700" : "bg-gray-200")} />
                            <div className={cn("h-1 w-full rounded-sm", isTech ? "bg-gray-700" : "bg-gray-200")} />
                        </div>
                    </>
                )}
            </div>

            {/* Visual Flair specific to templates */}
            {name === 'bold' && <div className="absolute inset-0 border-4 border-black" />}
            {name === 'compact' && <div className="absolute inset-0 border-2 border-blue-500/20" />}
        </div>
    );
}

export const TemplatesCarousel = () => {
    const [shuffledTemplates, setShuffledTemplates] = useState<TemplateName[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const visibleCount = 3;

    // Shuffle templates on mount
    useEffect(() => {
        const allTemplates = Object.keys(TEMPLATE_INFO) as TemplateName[];
        const shuffled = [...allTemplates].sort(() => 0.5 - Math.random());
        setShuffledTemplates(shuffled);
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % shuffledTemplates.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + shuffledTemplates.length) % shuffledTemplates.length);
    };

    // Get visible items
    const visibleItems: TemplateName[] = [];
    if (shuffledTemplates.length > 0) {
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % shuffledTemplates.length;
            visibleItems.push(shuffledTemplates[index]);
        }
    }

    if (shuffledTemplates.length === 0) return null;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0
        })
    };

    return (
        <section id="templates" className="py-32 bg-black/50 border-t border-white/5 scroll-mt-32 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">PREMIUM <span className="text-yellow-400">TEMPLATES</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Choose from our selection of {shuffledTemplates.length} ATS-optimized templates.</p>
                </motion.div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Carousel Track */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        <AnimatePresence mode='popLayout' custom={direction} initial={false}>
                            {visibleItems.map((templateKey, i) => {
                                const info = TEMPLATE_INFO[templateKey as TemplateName];
                                if (!info) return null;

                                return (
                                    <motion.div
                                        key={`${templateKey}-${currentIndex}`}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        layout
                                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                                        className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
                                    >
                                        <div className="h-64 bg-white/5 flex items-center justify-center p-8 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <TemplatePreview name={templateKey} />
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-1">{info.label}</h3>
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{info.description}</p>
                                            <div className="mt-auto">
                                                <Link href={`/builder/resume/demo?template=${templateKey}`}>
                                                    <Button size="sm" variant="outline" className="w-full border-white/10 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all font-bold">
                                                        Use Template
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-center mt-12 gap-2">
                    {shuffledTemplates.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-yellow-400' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
