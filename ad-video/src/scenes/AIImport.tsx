import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { FileText, Zap, Target, Sparkles } from 'lucide-react';

// Feature grid scene that shows the four main cards from the homepage:
// Resume Builder, AI Enhancer, Job Matching, PDF Export.
export const AIImport: React.FC = () => {
    const frame = useCurrentFrame();

    const headingY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' });
    const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    const cardEnter = (index: number) => {
        const start = 10 + index * 10;
        const end = start + 20;
        return {
            opacity: interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp' }),
            y: interpolate(frame, [start, end], [40, 0], { extrapolateRight: 'clamp' }),
        };
    };

    const features = [
        {
            icon: <FileText className="h-8 w-8 text-red-400" />,
            title: 'Resume Builder',
            desc: 'Drag-and-drop editor with live preview.',
            accent: 'bg-red-500/10',
        },
        {
            icon: <Sparkles className="h-8 w-8 text-amber-400" />,
            title: 'AI Enhancer',
            desc: 'Rewrite bullet points with powerful AI.',
            accent: 'bg-amber-500/10',
        },
        {
            icon: <Target className="h-8 w-8 text-blue-400" />,
            title: 'Job Matching',
            desc: 'Match score + missing keyword analysis.',
            accent: 'bg-blue-500/10',
        },
        {
            icon: <Zap className="h-8 w-8 text-purple-400" />,
            title: 'PDF Export',
            desc: 'Three premium templates, instant download.',
            accent: 'bg-purple-500/10',
        },
    ];

    return (
        <AbsoluteFill className="bg-[#050505] text-white items-center justify-center">
            <div className="max-w-5xl mx-auto px-10">
                <div
                    className="text-center mb-10"
                    style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)` }}
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
                        THE POWER BEHIND RESUME NUGGET
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black">
                        Everything you need to{" "}
                        <span className="text-lime-400">ship a killer resume</span>.
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const { opacity, y } = cardEnter(index);
                        return (
                            <div
                                key={feature.title}
                                className="rounded-3xl bg-[#101010] border border-white/10 p-6 flex flex-col items-start justify-between shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                                style={{ opacity, transform: `translateY(${y}px)` }}
                            >
                                <div className={`p-3 rounded-2xl ${feature.accent} mb-4`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-xs text-gray-400">{feature.desc}</p>
                                </div>
                                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-gray-500">
                                    Included. No paywalls.
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
