import React from 'react';
import { VisualHero } from './VisualHero';
import { VisualFeatureCard } from './VisualFeatureCard';
import { FileText, Sparkles, Target, Zap } from 'lucide-react';
import { VisualLogo } from './VisualLogo';

export const SleekLandingPage = ({ showCards = true, cardScale = 1 }: { showCards?: boolean, cardScale?: number }) => {
    return (
        <div className="w-[1920px] bg-[#0a0a0a] flex flex-col items-center relative overflow-hidden">
            {/* Navbar Mock */}
            <div className="w-full flex justify-between items-center px-20 py-8 border-b border-white/5 bg-black/50 backdrop-blur-xl z-10 sticky top-0">
                <VisualLogo />
                <div className="flex gap-8 text-gray-400 text-lg">
                    <span>Dashboard</span>
                    <span>Templates</span>
                    <span>About</span>
                </div>
                <div className="bg-lime-500 text-black font-bold px-6 py-2 rounded-full">Sign In</div>
            </div>

            {/* Hero Section */}
            <VisualHero />

            {/* Feature Cards Section - Placed similarly to the website */}
            <div className="flex gap-8 px-20 pb-20 justify-center w-full max-w-7xl mx-auto transform origin-top" style={{ transform: `scale(${cardScale})` }}>
                <VisualFeatureCard
                    icon={FileText}
                    title="Resume Builder"
                    description="Drag-and-drop editor with live preview"
                    colorClass={{ bg: 'bg-red-500/10', text: 'text-red-400' }}
                />
                <VisualFeatureCard
                    icon={Sparkles}
                    title="AI Enhancer"
                    description="Rewrite bullet points with powerful AI"
                    colorClass={{ bg: 'bg-amber-500/10', text: 'text-amber-400' }}
                />
                <VisualFeatureCard
                    icon={Target}
                    title="Job Matching"
                    description="Match score + missing keyword analysis"
                    colorClass={{ bg: 'bg-blue-500/10', text: 'text-blue-400' }}
                />
                <VisualFeatureCard
                    icon={Zap}
                    title="PDF Export"
                    description="Three premium templates, instant download"
                    colorClass={{ bg: 'bg-purple-500/10', text: 'text-purple-400' }}
                />
            </div>
        </div>
    );
};
