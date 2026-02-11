import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const CTA = () => {
    const frame = useCurrentFrame();

    const glowOpacity = interpolate(Math.sin(frame / 10), [-1, 1], [0.5, 1]);
    const textOpacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex flex-col items-center justify-center gap-8">
            <button
                className="bg-red-500 text-white px-12 py-6 rounded-full text-3xl font-black tracking-tight transform hover:scale-105 transition-transform"
                style={{
                    boxShadow: `0 0 50px rgba(239, 68, 68, ${glowOpacity})`
                }}
            >
                Start Building
            </button>
            <p className="text-gray-400 text-xl" style={{ opacity: textOpacity }}>
                Build yours in minutes.
            </p>
        </AbsoluteFill>
    );
};
