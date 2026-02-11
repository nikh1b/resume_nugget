import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const Problem = () => {
    const frame = useCurrentFrame();
    const text = "Struggling with your resume?";

    // Typewriter effect
    const charsToShow = Math.floor(frame / 3);
    const displayedText = text.slice(0, charsToShow);

    // Cursor blinking
    const showCursor = frame % 20 < 10;

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <h1 className="text-6xl font-mono text-white">
                {displayedText}
                {showCursor && <span className="text-red-500">_</span>}
            </h1>
        </AbsoluteFill>
    );
};
