import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { SleekLandingPage } from '../../components/ui/SleekLandingPage';

export const Solution = () => {
    const frame = useCurrentFrame();

    // Slide in from bottom
    const translateY = interpolate(frame, [0, 30], [1080, 0], {
        extrapolateRight: 'clamp'
    });

    // 3D Tilt effect (simulated with rotateX)
    const rotateX = interpolate(frame, [30, 90], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div style={{ transform: `translateY(${translateY}px) rotateX(${rotateX}deg)` }}>
                <SleekLandingPage />
            </div>

            {/* Highlight/Mask Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 30%, black 100%)',
                    opacity: interpolate(frame, [40, 60], [0, 0.8])
                }}
            />
        </AbsoluteFill>
    );
};
