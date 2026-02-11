import { FileText, Sparkles, Target, Zap } from 'lucide-react';

export const VisualFeatureCard = ({ icon: Icon, title, description, colorClass }: any) => (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 w-64 h-48 justify-center shadow-xl">
        <div className={`p-4 rounded-full bg-opacity-20 ${colorClass.bg}`}>
            <Icon className={`h-8 w-8 ${colorClass.text}`} />
        </div>
        <span className="text-white font-bold text-lg">{title}</span>
        <p className="text-gray-500 text-xs">{description}</p>
    </div>
);
