import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { VisualLogo } from '../../components/ui/VisualLogo';

export const Intro = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const scale = interpolate(frame, [0, 100], [1, 1.1]);

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center">
            <div style={{ opacity, transform: `scale(${scale})` }} className="scale-[2]">
                <VisualLogo />
            </div>
        </AbsoluteFill>
    );
};
