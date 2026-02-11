import { Composition, Series } from 'remotion';
import { Intro } from './scenes/cinematic/Intro';
import { Problem } from './scenes/cinematic/Problem';
import { Solution } from './scenes/cinematic/Solution';
import { Features } from './scenes/cinematic/Features';
import { Outro } from './scenes/cinematic/Outro';
import './style.css';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="AdVideo"
                component={CinematicMain}
                durationInFrames={900} // 30 seconds at 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};

const CinematicMain = () => {
    return (
        <Series>
            {/* Scene 1: Intro (0-4s) */}
            <Series.Sequence durationInFrames={120}>
                <Intro />
            </Series.Sequence>

            {/* Scene 2: Problem (4-8s) */}
            <Series.Sequence durationInFrames={120}>
                <Problem />
            </Series.Sequence>

            {/* Scene 3: Solution (8-18s) - Scrolling Dashboard */}
            <Series.Sequence durationInFrames={300}>
                <Solution />
            </Series.Sequence>

            {/* Scene 4: Features (18-25s) - Editor Zoom */}
            <Series.Sequence durationInFrames={210}>
                <Features />
            </Series.Sequence>

            {/* Scene 5: Outro (25-30s) */}
            <Series.Sequence durationInFrames={150}>
                <Outro />
            </Series.Sequence>
        </Series>
    );
};
