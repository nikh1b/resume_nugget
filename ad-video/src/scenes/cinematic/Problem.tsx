import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CinematicText } from '../../components/CinematicText';

export const Problem = () => {
    const frame = useCurrentFrame();

    const opacity1 = interpolate(frame, [0, 20], [0, 1]);
    const opacity2 = interpolate(frame, [40, 60], [0, 1]);

    return (
        <AbsoluteFill className="bg-black flex flex-col items-center justify-center gap-4">
            <div style={{ opacity: opacity1 }}>
                <CinematicText
                    text="STOP SENDING"
                    className="text-6xl text-gray-500 font-bold tracking-widest"
                />
            </div>
            <div style={{ opacity: opacity2 }}>
                <CinematicText
                    text="UGLY RESUMES"
                    className="text-7xl text-red-600 font-black tracking-tighter"
                />
            </div>
        </AbsoluteFill>
    );
};
