import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Templates carousel inspired by the homepage "Premium Templates" section.
export const Templates: React.FC = () => {
    const frame = useCurrentFrame();

    const xOffset = interpolate(frame, [0, 120], [0, -1400]);

    return (
        <AbsoluteFill className="bg-black flex-row items-center px-16 overflow-hidden text-white">
            <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
                    PREMIUM, ATS-FRIENDLY DESIGNS
                </p>
                <h2 className="text-3xl md:text-4xl font-black">
                    Pick a template that{" "}
                    <span className="text-lime-400">actually looks like you</span>.
                </h2>
            </div>

            <div
                className="flex flex-row gap-16 absolute left-1/2 -translate-x-1/2 mt-10"
                style={{ transform: `translateX(${xOffset}px)` }}
            >
                {/* Ivy League */}
                <div className="h-[520px] w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="p-8 flex-1">
                        <div className="h-6 w-1/3 bg-gray-300 rounded mb-4" />
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-2 w-2/3 bg-gray-200 rounded" />
                        </div>
                    </div>
                    <div className="px-8 pb-8">
                        <h3 className="text-black text-2xl font-bold mb-1">Ivy League</h3>
                        <p className="text-xs text-gray-600">
                            Clean, serif-based design for academic and corporate roles.
                        </p>
                    </div>
                </div>

                {/* Modern Tech */}
                <div className="h-[520px] w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
                    <div className="w-1/3 bg-gray-900 p-4">
                        <div className="h-10 w-10 rounded-full bg-gray-700 mb-3" />
                        <div className="h-3 w-full bg-gray-700 rounded mb-1" />
                        <div className="h-2 w-3/4 bg-gray-700 rounded" />
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-between">
                        <div>
                            <div className="h-4 w-1/2 bg-gray-300 rounded mb-3" />
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-gray-200 rounded" />
                                <div className="h-2 w-5/6 bg-gray-200 rounded" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-black text-2xl font-bold mb-1">Modern Tech</h3>
                            <p className="text-xs text-gray-600">
                                Two-column layout with a dark sidebar for devs & designers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Creative Studio */}
                <div className="h-[520px] w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-24 w-full bg-purple-600" />
                    <div className="p-6 flex-1">
                        <div className="space-y-2 mb-6">
                            <div className="h-3 w-1/2 bg-gray-300 rounded" />
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-2 w-3/4 bg-gray-200 rounded" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-2 w-4/5 bg-gray-200 rounded" />
                        </div>
                    </div>
                    <div className="px-6 pb-6">
                        <h3 className="text-black text-2xl font-bold mb-1">Creative Studio</h3>
                        <p className="text-xs text-gray-600">
                            Bold headers and vibrant accents for creative roles.
                        </p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
