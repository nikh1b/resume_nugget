import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { VisualFeatureCard } from '../../components/ui/VisualFeatureCard';
import { FileText, Sparkles, Target, Zap } from 'lucide-react';

export const Features = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const cards = [
        { icon: FileText, title: "Resume Builder", desc: "Drag-and-drop editor", color: { bg: 'bg-red-500/10', text: 'text-red-400' } },
        { icon: Sparkles, title: "AI Enhancer", desc: "Rewrite bullet points", color: { bg: 'bg-amber-500/10', text: 'text-amber-400' } },
        { icon: Target, title: "Job Matching", desc: "Match score analysis", color: { bg: 'bg-blue-500/10', text: 'text-blue-400' } },
        { icon: Zap, title: "PDF Export", desc: "Instant download", color: { bg: 'bg-purple-500/10', text: 'text-purple-400' } },
    ];

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center">
            <h2 className="absolute top-20 text-4xl font-bold text-white mb-10">POWERFUL FEATURES</h2>
            <div className="flex gap-8 px-20 transform scale-125">
                {cards.map((card, index) => {
                    const delay = index * 10;
                    const scale = spring({
                        frame: frame - delay,
                        fps,
                        from: 0,
                        to: 1,
                        config: { stiffness: 100 }
                    });

                    return (
                        <div key={index} style={{ transform: `scale(${scale})` }}>
                            <VisualFeatureCard
                                icon={card.icon}
                                title={card.title}
                                description={card.desc}
                                colorClass={card.color}
                            />
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
