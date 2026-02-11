import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { VisualLogo } from '../components/ui/VisualLogo';

export const Intro = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        from: 0.5,
        to: 1,
        config: { damping: 10, mass: 0.5 }
    });

    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center">
            <div style={{ transform: `scale(${scale})`, opacity }}>
                <div className="transform scale-[3]">
                    <VisualLogo />
                </div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: 100,
                opacity: interpolate(frame, [30, 50], [0, 1]),
                fontFamily: 'sans-serif',
                color: '#84cc16' // lime-500
            }} className="text-xl tracking-widest font-bold uppercase">
                The Future of Resumes
            </div>
        </AbsoluteFill>
    );
};
