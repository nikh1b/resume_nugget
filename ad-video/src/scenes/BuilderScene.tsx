import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { VisualResumeForm } from '../components/ui/VisualResumeForm';
import { VisualModernTemplate } from '../components/ui/VisualModernTemplate';

export const BuilderScene = () => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();

    const formOffset = spring({
        frame,
        fps: 30,
        from: -width / 2,
        to: 0,
        config: { damping: 20 }
    });

    const previewScale = spring({
        frame: frame - 10,
        fps: 30,
        from: 0.8,
        to: 1,
        config: { damping: 20 }
    });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] flex flex-row">
            {/* Split Screen */}
            <div style={{ width: '40%', transform: `translateX(${formOffset}px)` }} className="h-full z-10 border-r border-white/20 box-border">
                <VisualResumeForm />
            </div>

            <div className="flex-1 bg-gray-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                <div style={{ transform: `scale(${previewScale})` }} className="shadow-2xl">
                    <VisualModernTemplate />
                </div>
            </div>

            <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <h2 className="text-white font-bold text-2xl">Real-time Preview</h2>
            </div>
        </AbsoluteFill>
    );
};
