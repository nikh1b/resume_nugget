import React, { useEffect, useState } from 'react';
import { random } from 'remotion';

export const GlitchContainer = ({ children, intensity = 1 }: { children: React.ReactNode, intensity?: number }) => {
    // This is a simplified container that would apply CSS filters or transforms
    // ideally driven by Remotion frame, but for now we just wrap content
    // We can add canvas-based glitch or SVG filters here later if needed.

    return (
        <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] bg-repeat" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

            {children}
        </div>
    );
};
