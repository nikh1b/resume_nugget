import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { BrutalText } from '../../components/brutalist/BrutalText';
import { GlitchContainer } from '../../components/brutalist/GlitchContainer';
import { VisualLogo } from '../../components/ui/VisualLogo';

export const Outro = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene timing: 0-150 frames (5s)

    // NO PAYWALLS
    const text1Opacity = interpolate(frame, [0, 10, 50, 60], [0, 1, 1, 0]);

    // BUILD KILLER RESUMES
    const logoScale = spring({ frame: frame - 60, fps, from: 0, to: 1, config: { damping: 15 } });
    const showFinal = frame >= 60;

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <GlitchContainer>
                {/* NO PAYWALLS */}
                <div style={{ opacity: text1Opacity }} className="absolute flex flex-col items-center">
                    <BrutalText text="NO PAYWALLS" className="text-6xl text-white" />
                    <BrutalText text="JUST RESULTS" className="text-6xl text-lime-500 mt-2" glitch={true} />
                </div>

                {/* LOGO & CTA */}
                {showFinal && (
                    <div style={{ transform: `scale(${logoScale})` }} className="flex flex-col items-center gap-8">
                        <div className="scale-[2]">
                            <VisualLogo />
                        </div>

                        <div className="bg-white/10 border border-white/20 p-6 rounded-none mt-8 backdrop-blur text-center">
                            <BrutalText text="BUILD KILLER RESUMES" className="text-2xl text-white mb-2" />
                            <div className="bg-lime-500 text-black font-black px-6 py-2">
                                RESUMENUGGET.COM
                            </div>
                        </div>
                    </div>
                )}
            </GlitchContainer>
        </AbsoluteFill>
    );
};
