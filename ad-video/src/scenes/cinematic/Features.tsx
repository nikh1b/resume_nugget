import { AbsoluteFill, useCurrentFrame, interpolate, Img, spring, useVideoConfig } from 'remotion';
import { staticFile } from 'remotion';
import { CinematicText } from '../../components/CinematicText';

export const Features = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pan across the editor interface
    // Start at top-left, move to center
    const x = interpolate(frame, [0, 150], [0, -100]);
    const y = interpolate(frame, [0, 150], [0, -200]);
    const scale = interpolate(frame, [0, 150], [1, 1.2]);

    const showText = frame > 30;

    return (
        <AbsoluteFill className="bg-black overflow-hidden flex items-center justify-center">
            {/* Real Editor Screenshot */}
            <Img
                src={staticFile('screen_editor.png')}
                style={{
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    transformOrigin: 'top left',
                    width: '120%' // Slight overscan
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Feature Highlight */}
            {showText && (
                <div className="absolute flex flex-col items-center">
                    <div className="border-2 border-lime-500 rounded-lg p-10 backdrop-blur-sm bg-lime-500/10 mb-4 animate-pulse">
                        <CinematicText text="REAL-TIME EDITOR" className="text-5xl text-white font-bold" />
                    </div>
                    <CinematicText text="See changes instantly" className="text-2xl text-gray-300" />
                </div>
            )}
        </AbsoluteFill>
    );
};
