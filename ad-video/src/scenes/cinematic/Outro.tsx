import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CinematicText } from '../../components/CinematicText';

export const Outro = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        from: 0.8,
        to: 1,
        config: { damping: 12 }
    });

    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-black flex flex-col items-center justify-center">
            <div style={{ transform: `scale(${scale})`, opacity }}>
                <CinematicText
                    text="START BUILDING NOW"
                    className="text-7xl text-white mb-8 font-black"
                />

                <div className="bg-red-600 text-white px-12 py-4 text-3xl font-bold rounded-full text-center shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    RESUMENUGGET.COM
                </div>

                <p className="text-gray-500 mt-8 text-xl tracking-widest text-center">
                    100% FREE • NO SIGNUP REQUIRED
                </p>
            </div>
        </AbsoluteFill>
    );
};
