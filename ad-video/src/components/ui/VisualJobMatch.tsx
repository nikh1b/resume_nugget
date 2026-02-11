import { Bot, CheckCircle, Search, AlertCircle, Loader2 } from 'lucide-react';
import React from 'react';

// Simplified UI components for Remotion
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const CardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);
const Button = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) => (
    <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${variant === 'outline' ? 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground' : 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
        } ${className}`}>
        {children}
    </button>
);
const Progress = ({ value, className }: { value: number, className?: string }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-primary/20 ${className}`}>
        <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </div>
);

export const VisualJobMatch = ({ score = 0, showResult = false }: { score?: number, showResult?: boolean }) => {
    return (
        <div className="h-full flex flex-col space-y-4 bg-black/80 rounded-xl border border-white/10 text-white p-4 w-[500px]">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Search className="h-6 w-6 text-lime-400" /> Job Match Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                    AI-powered analysis of your resume vs job description.
                </CardDescription>
            </CardHeader>
            <div className="flex-1 space-y-4">
                {showResult ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-2">
                            <span className="text-6xl font-black text-lime-400">{Math.round(score)}%</span>
                            <Progress value={score} className="h-3 bg-gray-800" />
                            <p className="text-sm text-gray-400">{score >= 80 ? 'Great Match!' : 'Needs Improvement'}</p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2 text-white">
                                <AlertCircle className="h-4 w-4 text-orange-500" /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-orange-900/30 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/30">React Native</span>
                                <span className="bg-orange-900/30 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/30">GraphQL</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2 text-white">
                                <CheckCircle className="h-4 w-4 text-green-500" /> Matching Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {['TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'PostgreSQL'].map((kw, i) => (
                                    <span key={i} className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 opacity-50">
                        <div className="h-32 bg-white/5 rounded-md border border-white/10 p-4 text-gray-500 text-sm">
                            Paste Job Description here...
                        </div>
                        <Button className="w-full bg-lime-500 text-black hover:bg-lime-400">
                            <Bot className="mr-2 h-4 w-4" /> Analyze Match
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
