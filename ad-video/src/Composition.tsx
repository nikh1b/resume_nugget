import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Intro } from './scenes/Intro';
import { AIImport } from './scenes/AIImport';
import { NvidiaMagic } from './scenes/NvidiaMagic';
import { Templates } from './scenes/Templates';
import { Outro } from './scenes/Outro';

export const Main: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden">
            <Series>
                <Series.Sequence durationInFrames={90}>
                    <Intro />
                </Series.Sequence>
                <Series.Sequence durationInFrames={120}>
                    <AIImport />
                </Series.Sequence>
                <Series.Sequence durationInFrames={150}>
                    <NvidiaMagic />
                </Series.Sequence>
                <Series.Sequence durationInFrames={120}>
                    <Templates />
                </Series.Sequence>
                <Series.Sequence durationInFrames={120}>
                    <Outro />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
