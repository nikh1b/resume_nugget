"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useEffect, useState } from "react";
import { analyzeResume } from "@/app/actions/ai";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, AlertCircle, CheckCircle, ChevronRight, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export function ResumeScore() {
    const { resume } = useResumeStore();
    const [score, setScore] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<{
        summary: string;
        suggestions: string[];
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Function to calculate score (debounced implementation could be added) or manual trigger
    const handleAnalyze = async () => {
        setLoading(true);
        try {
            // Construct a text representation relative to what the AI needs
            const resumeText = JSON.stringify(resume);
            const result = await analyzeResume(resumeText);

            if (result.success && result.analysis) {
                setScore(result.analysis.score);
                setAnalysis({
                    summary: result.analysis.summary,
                    suggestions: result.analysis.suggestions,
                });
            } else {
                toast.error("Failed to analyze resume.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Analysis failed.");
        } finally {
            setLoading(false);
        }
    };

    // Auto-analyze on first open if no score
    useEffect(() => {
        if (isOpen && !score && !loading) {
            handleAnalyze();
        }
    }, [isOpen]);

    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-green-500";
        if (s >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getScoreBorder = (s: number) => {
        if (s >= 80) return "border-green-500";
        if (s >= 60) return "border-yellow-500";
        return "border-red-500";
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div
                    className={`fixed bottom-6 right-6 z-50 bg-[#111] border border-white/10 rounded-full shadow-2xl p-1 pr-4 flex items-center gap-3 cursor-pointer hover:border-white/20 transition-all group ${loading ? "opacity-80" : ""
                        }`}
                >
                    <div
                        className={`h-12 w-12 rounded-full border-4 flex items-center justify-center bg-black ${score ? getScoreBorder(score) : "border-gray-700"
                            }`}
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                        ) : (
                            <span className={`font-bold text-sm ${score ? getScoreColor(score) : "text-gray-400"}`}>
                                {score || "?"}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Resume Score</span>
                        <span className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {loading ? "Analyzing..." : score ? "View Analysis" : "Click to Analyze"}
                        </span>
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px] bg-[#111] border-white/10 p-0">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                Resume Score
                                {score && (
                                    <span className={`text-lg ${getScoreColor(score)}`}>
                                        {score}/100
                                    </span>
                                )}
                            </SheetTitle>
                            <SheetDescription className="text-gray-400">
                                Real-time feedback to improve your resume's impact.
                            </SheetDescription>
                        </SheetHeader>

                        {loading ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                                <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
                                <p className="text-gray-400">Analyzing your resume against industry standards...</p>
                            </div>
                        ) : score !== null && analysis ? (
                            <div className="space-y-8">
                                {/* Summary */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-blue-400" />
                                        Summary
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {analysis.summary}
                                    </p>
                                </div>

                                {/* Score Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Impact Score</span>
                                        <span>{score}%</span>
                                    </div>
                                    <Progress value={score} className="h-2 bg-white/10" />
                                </div>

                                {/* Suggestions */}
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-400" />
                                        Action Items
                                    </h4>
                                    <div className="space-y-3">
                                        {analysis.suggestions.map((suggestion, i) => (
                                            <div key={i} className="flex gap-3 bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                                                <div className="mt-0.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                                </div>
                                                <p className="text-sm text-gray-300">{suggestion}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAnalyze}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Re-Analyze
                                </Button>
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                                <Button size="lg" onClick={handleAnalyze} className="bg-purple-600 hover:bg-purple-500 text-white rounded-full">
                                    Start Analysis
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
