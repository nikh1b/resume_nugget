"use client";

import { useState } from "react";
import { analyzeIntent } from "@/app/actions/ai";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Radar, Crosshair, BrainCircuit, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntentAnalysis {
    predicted_level: string;
    tone_classification: string;
    predicted_role: string;
    intent_gap_warning?: string;
}

export function IntentAnalyzer() {
    const { resume } = useResumeStore();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<IntentAnalysis | null>(null);

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const result = await analyzeIntent(JSON.stringify(resume));
            if (result.success && result.analysis) {
                setAnalysis(result.analysis as IntentAnalysis);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300">
                    <BrainCircuit className="mr-2 h-4 w-4" /> Intent Scan
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-[#0a0a0a] border-purple-900/50 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-purple-500 text-xl font-bold">
                        <Radar className="h-6 w-6" /> Intent Classifier
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        AI analysis of your sub-text, tone, and true seniority level.
                    </DialogDescription>
                </DialogHeader>

                {!analysis && !loading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                            <Crosshair className="h-8 w-8 text-purple-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">What is your resume <i>really</i> saying?</h3>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto">
                                I'll analyze your verb choices and scope to determine if you sound like a Junior, Senior, or Exec.
                            </p>
                        </div>
                        <Button onClick={handleAnalyze} className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                            REVEAL TRUE LEVEL
                        </Button>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                        <p className="text-purple-400 font-mono animate-pulse">ANALYZING SIGNAL...</p>
                    </div>
                )}

                {analysis && !loading && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Predicted Level</span>
                                <span className="text-2xl font-bold text-white">{analysis.predicted_level}</span>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Detected Tone</span>
                                <span className="text-lg font-bold text-blue-300">{analysis.tone_classification}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Predicted Role</span>
                            <Badge className="text-lg py-1 px-4 bg-purple-500/20 text-purple-200 border-purple-500/50 hover:bg-purple-500/30">
                                {analysis.predicted_role}
                            </Badge>
                        </div>

                        {analysis.intent_gap_warning && (
                            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-500 mb-1">Intent Gap Detected</h4>
                                    <p className="text-sm text-gray-300">{analysis.intent_gap_warning}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleAnalyze}
                                className="text-gray-400 hover:text-white"
                            >
                                Re-Analyze
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
