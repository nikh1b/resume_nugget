import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const BrutalText = ({
    text,
    color = 'white',
    className = '',
    glitch = false
}: {
    text: string;
    color?: string;
    className?: string;
    glitch?: boolean;
}) => {
    const frame = useCurrentFrame();

    // Simple glitch offset
    const glitchOffset = glitch ? interpolate(
        Math.sin(frame * 0.5),
        [-1, 1],
        [-2, 2]
    ) : 0;

    return (
        <div className={`relative font-black tracking-tighter uppercase leading-[0.8] ${className}`} style={{ color }}>
            {/* Main Text */}
            <span style={{ transform: `translate(${glitchOffset}px, 0)` }} className="block">
                {text}
            </span>

            {/* Glitch Shadow (Red) */}
            {glitch && (
                <span
                    className="absolute top-0 left-0 text-red-500 opacity-50 mix-blend-screen -z-10"
                    style={{
                        transform: `translate(${glitchOffset * 2 + 4}px, 0)`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                    }}
                >
                    {text}
                </span>
            )}
            {/* Glitch Shadow (Blue/Green) */}
            {glitch && (
                <span
                    className="absolute top-0 left-0 text-lime-500 opacity-50 mix-blend-screen -z-10"
                    style={{
                        transform: `translate(${-glitchOffset * 2 - 4}px, 0)`,
                        clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                    }}
                >
                    {text}
                </span>
            )}
        </div>
    );
};
