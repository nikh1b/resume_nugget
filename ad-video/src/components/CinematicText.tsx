import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const CinematicText = ({
    text,
    className = '',
    style = {}
}: {
    text: string;
    className?: string;
    style?: React.CSSProperties;
}) => {
    const frame = useCurrentFrame();

    // Subtle float animation
    const floatY = interpolate(Math.sin(frame / 20), [-1, 1], [-5, 5]);

    // Slow scale up
    const scale = interpolate(frame, [0, 100], [1, 1.05]);

    return (
        <div
            className={`font-black text-center tracking-tight text-white ${className}`}
            style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transform: `translateY(${floatY}px) scale(${scale})`,
                ...style
            }}
        >
            {text}
        </div>
    );
};
