import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { BrutalText } from '../../components/brutalist/BrutalText';
import { GlitchContainer } from '../../components/brutalist/GlitchContainer';
import { NeonBadge } from '../../components/brutalist/NeonBadge';

export const FeaturesStomp = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene timing: 0-150 frames (5s)

    // 1. AI POWERED (0-50)
    const stomp1 = spring({ frame: frame, fps, config: { stiffness: 200, damping: 10 } });
    const show1 = frame >= 0 && frame < 50;

    // 2. ATS CRUSHER (50-100)
    const stomp2 = spring({ frame: frame - 50, fps, config: { stiffness: 200, damping: 10 } });
    const show2 = frame >= 50 && frame < 100;

    // 3. VERIFIED (100-150)
    const stomp3 = spring({ frame: frame - 100, fps, config: { stiffness: 200, damping: 10 } });
    const show3 = frame >= 100;

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <GlitchContainer>
                {/* AI POWERED */}
                {show1 && (
                    <div style={{ transform: `scale(${stomp1})` }} className="flex flex-col items-center">
                        <BrutalText text="AI" className="text-9xl text-lime-500" glitch={true} />
                        <BrutalText text="POWERED" className="text-6xl text-white" />
                    </div>
                )}

                {/* ATS CRUSHER */}
                {show2 && (
                    <div style={{ transform: `scale(${stomp2})` }} className="flex flex-col items-center relative">
                        <div className="absolute inset-0 border-4 border-red-600 scale-150 opacity-20 animate-ping"></div>
                        <BrutalText text="ATS" className="text-9xl text-white line-through decoration-red-600 decoration-8" />
                        <BrutalText text="CRUSHER" className="text-6xl text-red-500" glitch={true} />
                    </div>
                )}

                {/* VERIFIED */}
                {show3 && (
                    <div style={{ transform: `scale(${stomp3})` }} className="flex flex-col items-center gap-6">
                        <BrutalText text="RESULT:" className="text-4xl text-gray-400" />
                        <div className="scale-150">
                            <NeonBadge text="VERIFIED: 98% MATCH" />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <span className="text-xs font-mono text-gray-500">NO_FALSE_POSITIVES</span>
                            <span className="text-xs font-mono text-gray-500">REAL_TIME_ANALYSIS</span>
                        </div>
                    </div>
                )}
            </GlitchContainer>
        </AbsoluteFill>
    );
};
