import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Img } from 'remotion';

export const ScreenshotScroll = ({
    src,
    direction = 'up',
    scale = 1
}: {
    src: string;
    direction?: 'up' | 'down';
    scale?: number;
}) => {
    const frame = useCurrentFrame();

    // Simulate scrolling through the page
    const translateY = interpolate(
        frame,
        [0, 150],
        [0, direction === 'up' ? -200 : 200],
        { extrapolateRight: 'clamp' }
    );

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="shadow-2xl rounded-xl overflow-hidden border border-white/10"
                style={{
                    transform: `translateY(${translateY}px) scale(${scale})`
                }}
            >
                <Img src={src} className="w-full h-auto max-w-4xl" />
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)] pointer-events-none" />
        </div>
    );
};
