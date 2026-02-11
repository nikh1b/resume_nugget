import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Final "Why Resume Nugget" + CTA scene.
export const Outro: React.FC = () => {
    const frame = useCurrentFrame();

    const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateRight: 'clamp' });
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

    const statsOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505] items-center justify-center text-white">
            <div className="max-w-4xl mx-auto px-10 text-center">
                <div
                    style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
                    className="mb-8"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                        WHY RESUME NUGGET?
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black">
                        No paywalls. No gimmicks.{" "}
                        <span className="text-red-500">Just better resumes.</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-4">
                        Other builders hide AI, templates, and exports behind subscriptions.
                        Resume Nugget ships them all—{" "}
                        <span className="text-lime-400 font-semibold">100% free, always</span>.
                    </p>
                </div>

                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-y border-white/10 py-6"
                    style={{ opacity: statsOpacity }}
                >
                    <div>
                        <div className="text-3xl font-black">100%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                            Free
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-black">3+</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                            Templates
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-black">AI</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                            Powered
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-black">ATS</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                            Friendly
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg border border-yellow-400 flex items-center justify-center bg-black">
                            <div className="w-4 h-4 rounded-md bg-lime-400" />
                        </div>
                        <div className="flex flex-col leading-none text-left">
                            <span className="text-xs font-black tracking-[0.18em]">
                                RESUME
                            </span>
                            <span className="text-xs font-black tracking-[0.18em] text-red-500">
                                NUGGET
                            </span>
                        </div>
                    </div>

                    <div className="h-10 w-px bg-white/15 hidden md:block" />

                    <div className="text-left">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                            Start building at
                        </p>
                        <p className="text-2xl font-bold">resumenugget.com</p>
                    </div>

                    <div className="px-7 py-2 rounded-full bg-red-500 text-white text-sm font-black tracking-wide shadow-lg shadow-red-500/40">
                        Build your resume now
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
