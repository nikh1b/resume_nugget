import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { VisualModernTemplate } from '../components/ui/VisualModernTemplate';

export const TemplateScene = () => {
    const frame = useCurrentFrame();

    // Parallax effect for cards moving horizontally
    const xOffset = interpolate(frame, [0, 90], [0, -300]);

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
            <h2 className="text-4xl font-black text-white mb-10 z-10 bg-black/50 px-6 py-2 rounded-xl backdrop-blur">PREMIUM TEMPLATES</h2>

            <div className="flex gap-10 absolute" style={{ transform: `translateX(${xOffset}px) rotate(-5deg)` }}>
                <div className="scale-75 opacity-50"><VisualModernTemplate /></div>
                <div className="scale-100 shadow-[0_0_50px_rgba(132,204,22,0.3)] border-4 border-lime-500/50 rounded-lg"><VisualModernTemplate /></div>
                <div className="scale-75 opacity-50"><VisualModernTemplate /></div>
                <div className="scale-75 opacity-50"><VisualModernTemplate /></div>
            </div>

            <div className="absolute bottom-10 right-10 bg-lime-500 text-black font-black text-xl px-6 py-3 rounded-full shadow-lg">
                100% FREE
            </div>
        </AbsoluteFill>
    );
};
