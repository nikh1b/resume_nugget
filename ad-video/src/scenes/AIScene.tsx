import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { VisualJobMatch } from '../components/ui/VisualJobMatch';

export const AIScene = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const score = interpolate(frame, [0, 60], [0, 92], {
        extrapolateRight: 'clamp'
    });

    const showResult = frame > 10;

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

            <div className="z-10 transform scale-125">
                <VisualJobMatch score={score} showResult={showResult} />
            </div>

            <div className="absolute bottom-20 text-center">
                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">AI-POWERED OPTIMIZATION</h2>
                <p className="text-gray-400">Target any job description with precision</p>
            </div>
        </AbsoluteFill>
    );
};
