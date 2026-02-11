import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Cpu, Sparkles } from 'lucide-react';

// Scene focusing on the AI engine + live enhancement UI.
export const NvidiaMagic: React.FC = () => {
    const frame = useCurrentFrame();

    const leftX = interpolate(frame, [0, 25], [-60, 0], { extrapolateRight: 'clamp' });
    const leftOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

    const rightX = interpolate(frame, [10, 35], [80, 0], { extrapolateRight: 'clamp' });
    const rightOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-gradient-to-br from-black via-[#050810] to-black text-white items-center justify-center">
            <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-[radial-gradient(circle_at_top,_#22c55e_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ef4444_0,_transparent_55%)]" />
            </div>

            <div className="relative z-10 flex max-w-6xl mx-auto px-16 items-center gap-16">
                {/* Left: AI badge and copy */}
                <div
                    className="flex-1"
                    style={{ opacity: leftOpacity, transform: `translateX(${leftX}px)` }}
                >
                    <div className="inline-flex items-center gap-3 rounded-full bg-black/60 border border-lime-500/40 px-4 py-2 mb-4">
                        <Cpu className="w-5 h-5 text-lime-400" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-300">
                            Powered by NVIDIA NIM
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
                        Let AI rewrite your{" "}
                        <span className="text-lime-400">entire story</span>.
                    </h2>
                    <p className="text-sm text-gray-300 max-w-md mb-4">
                        Resume Nugget uses NVIDIA NIM (MiniMax) to sharpen your bullet points,
                        fix weak wording, and highlight impact—while keeping your voice.
                    </p>
                    <p className="text-[11px] font-mono text-gray-400">
                        Engine: <span className="text-lime-400">minimaxai/minimax-m2.1</span> ·
                        latency-optimized for instant previews.
                    </p>
                </div>

                {/* Right: enhancement UI */}
                <div
                    className="flex-1"
                    style={{ opacity: rightOpacity, transform: `translateX(${rightX}px)` }}
                >
                    <div className="rounded-3xl bg-[#040712]/90 border border-white/10 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.9)]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                                <span className="text-[11px] font-mono text-gray-300">
                                    AI Enhancer · Live
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Sparkles className="w-3 h-3 text-amber-300" />
                                <span>Rewrite · Expand · Shorten</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-white/10 bg-black/40 p-3 space-y-2 text-[11px] text-gray-400">
                                <p className="uppercase tracking-[0.18em] text-gray-500 mb-1">
                                    Before
                                </p>
                                <p>Worked on backend APIs and fixed bugs.</p>
                            </div>
                            <div className="rounded-2xl border border-lime-400/40 bg-black/60 p-3 space-y-2 text-[11px] text-gray-100">
                                <p className="uppercase tracking-[0.18em] text-lime-400 mb-1">
                                    After (AI enhanced)
                                </p>
                                <p>
                                    Designed and optimized REST APIs used by 1M+ users, reducing
                                    critical bugs by 45% and improving response times by 30%.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400">
                            <span>One click to apply across your resume.</span>
                            <span className="text-lime-400">No tokens, no paywall.</span>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
