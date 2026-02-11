import React from 'react';

export const VisualResumeForm = () => {
    return (
        <div className="w-full h-full bg-[#111] p-6 text-white border-r border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-bold text-lg">Personal Info</span>
                <div className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center text-lime-400 text-xs">
                    60%
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Full Name</label>
                    <div className="bg-white/5 border border-white/10 rounded-md p-2 text-sm text-white">Nikhil Singh</div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Headline</label>
                    <div className="bg-white/5 border border-white/10 rounded-md p-2 text-sm text-white">Full Stack Developer</div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</label>
                    <div className="bg-white/5 border border-white/10 rounded-md p-2 text-sm text-white">nikhil@example.com</div>
                </div>
            </div>

            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-4 flex items-center justify-center">
                <span className="text-gray-500 text-xs">AI Enhancement Active...</span>
            </div>
        </div>
    );
};
