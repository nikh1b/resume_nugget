import React from 'react';

export const NeonBadge = ({ text, color = '#84cc16' }: { text: string, color?: string }) => {
    return (
        <div className="relative inline-block group">
            <div
                className="absolute inset-0 bg-current opacity-20 blur-md"
                style={{ color }}
            ></div>
            <div
                className="relative border-2 px-6 py-2 bg-black/80 backdrop-blur-sm flex items-center gap-3 uppercase font-mono tracking-widest font-bold text-lg hover:bg-black transition-colors"
                style={{ borderColor: color, color: 'white' }}
            >
                <div className="w-3 h-3 bg-current animate-pulse" style={{ color }} />
                {text}
            </div>
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 bg-transparent" style={{ borderColor: color }} />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 bg-transparent" style={{ borderColor: color }} />
        </div>
    );
};
