import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { BrutalText } from '../../components/brutalist/BrutalText';
import { GlitchContainer } from '../../components/brutalist/GlitchContainer';
import { VisualLogo } from '../../components/ui/VisualLogo';

export const TheSolution = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene timing: 0-90 frames (3s)

    // "CHANGE THE RULES"
    const text1Y = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: 'clamp' });
    const text1Opacity = interpolate(frame, [0, 10, 40, 45], [0, 1, 1, 0]);

    // "RESUME NUGGET" - BIG REVEAL
    const revealScale = spring({
        frame: frame - 45,
        fps,
        from: 0,
        to: 1,
        config: { damping: 12 }
    });
    const revealOpacity = interpolate(frame, [45, 50], [0, 1]);

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <GlitchContainer>
                {/* Intro Text */}
                <div style={{ opacity: text1Opacity, transform: `translateY(${text1Y}px)` }} className="absolute flex flex-col items-center">
                    <div className="border-2 border-white px-4 py-2 mb-4">
                        <span className="font-mono text-white tracking-widest">SYSTEM_OVERRIDE</span>
                    </div>
                    <BrutalText text="CHANGE THE RULES" className="text-7xl text-white" />
                </div>

                {/* Logo Reveal */}
                <div style={{ opacity: revealOpacity, transform: `scale(${revealScale})` }} className="absolute flex flex-col items-center gap-8">
                    <div className="scale-[2.5]">
                        <VisualLogo />
                    </div>
                    <div className="text-lime-500 font-mono tracking-[0.5em] text-xl animate-pulse mt-8">
                        // INITIALIZED
                    </div>
                </div>
            </GlitchContainer>
        </AbsoluteFill>
    );
};
