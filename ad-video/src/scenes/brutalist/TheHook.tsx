import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { BrutalText } from '../../components/brutalist/BrutalText';
import { GlitchContainer } from '../../components/brutalist/GlitchContainer';

export const TheHook = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene timing: 0-90 frames (3s)

    // Part 1: "TIRED OF REJECTIONS?" (0-45 frames)
    const text1Opacity = interpolate(frame, [0, 10, 40, 45], [0, 1, 1, 0]);
    const text1Scale = interpolate(frame, [0, 45], [1, 1.2]);

    // Part 2: "THE GAME IS RIGGED." (45-90 frames)
    const text2Opacity = interpolate(frame, [45, 50, 85, 90], [0, 1, 1, 0]);
    const text2Shake = interpolate(Math.sin(frame * 0.8), [-1, 1], [-5, 5]) * (frame > 45 ? 1 : 0);

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <GlitchContainer>
                {/* Part 1 */}
                <div style={{ opacity: text1Opacity, transform: `scale(${text1Scale})` }} className="absolute">
                    <BrutalText text="TIRED OF" className="text-6xl text-white mb-2 text-center" />
                    <BrutalText text="REJECTIONS?" className="text-8xl text-red-500 text-center" glitch={frame % 5 === 0} />
                </div>

                {/* Part 2 */}
                <div style={{ opacity: text2Opacity, transform: `translateX(${text2Shake}px)` }} className="absolute">
                    <BrutalText text="THE GAME" className="text-6xl text-white mb-2 text-center" />
                    <BrutalText text="IS RIGGED." className="text-8xl text-red-600 text-center" glitch={true} />
                </div>
            </GlitchContainer>
        </AbsoluteFill>
    );
};
