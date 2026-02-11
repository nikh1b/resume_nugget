import { AbsoluteFill, useCurrentFrame, interpolate, Img, useVideoConfig } from 'remotion';
import { CinematicText } from '../../components/CinematicText';
import { staticFile } from 'remotion';

export const Solution = () => {
    const frame = useCurrentFrame();

    // Parallax Scroll Effect
    // Image moves UP (translateY negative) to simulate scrolling down
    const translateY = interpolate(frame, [0, 200], [0, -400], { extrapolateRight: 'clamp' });

    // Simple text fade
    const textOpacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            {/* Background Screenshot - Dimmed */}
            <div className="absolute inset-0 opacity-40">
                <Img
                    src={staticFile('screen_dashboard.png')}
                    style={{
                        width: '100%',
                        transform: `translateY(${translateY}px)`
                    }}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

            {/* Centered Text Overlay */}
            <div style={{ opacity: textOpacity }} className="z-10 bg-black/50 backdrop-blur-md p-8 border border-white/10 rounded-2xl">
                <CinematicText
                    text="BUILD EXPERT RESUMES"
                    className="text-6xl text-white mb-2"
                />
                <CinematicText
                    text="IN SECONDS"
                    className="text-4xl text-lime-400"
                />
            </div>
        </AbsoluteFill>
    );
};
