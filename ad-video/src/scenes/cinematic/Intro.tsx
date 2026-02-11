import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { CinematicText } from '../../components/CinematicText';
import { VisualLogo } from '../../components/ui/VisualLogo';

export const Intro = () => {
    const frame = useCurrentFrame();

    // Fade in Logo
    const logoOpacity = interpolate(frame, [0, 30], [0, 1]);
    const logoScale = interpolate(frame, [0, 100], [0.8, 1]);

    // Text Reveal
    const textOpacity = interpolate(frame, [30, 50], [0, 1]);
    const textY = interpolate(frame, [30, 80], [20, 0]);

    return (
        <AbsoluteFill className="bg-black flex flex-col items-center justify-center">
            {/* Logo */}
            <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }} className="scale-[2.5] mb-8">
                <VisualLogo />
            </div>

            {/* Cinematic Text */}
            <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}>
                <CinematicText
                    text="THE NEW STANDARD"
                    className="text-gray-400 text-xl tracking-[0.5em] font-light"
                />
            </div>
        </AbsoluteFill>
    );
};
