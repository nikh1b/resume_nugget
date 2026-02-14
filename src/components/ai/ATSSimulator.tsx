"use client";

import { useState } from "react";
import { simulateATS } from "@/app/actions/ai";
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
import { AlertTriangle, Bug, FileWarning, ShieldAlert, Loader2, Skull } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ATSAnalysis {
    verdict: 'Auto-Reject' | 'Barely Passed';
    roast_summary: string;
    critical_errors: string[];
    buzzword_penalty: string[];
}

export function ATSSimulator() {
    const { resume } = useResumeStore();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const result = await simulateATS(JSON.stringify(resume));
            if (result.success && result.analysis) {
                setAnalysis(result.analysis as ATSAnalysis);
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
                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    <Skull className="mr-2 h-4 w-4" /> Brutal ATS
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0a0a0a] border-red-900/50 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500 text-xl font-bold">
                        <Skull className="h-6 w-6" /> ATS SIMULATOR 9000
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Analyzing resume for parsing failures and corporate fluff...
                    </DialogDescription>
                </DialogHeader>

                {!analysis && !loading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
                            <ShieldAlert className="h-8 w-8 text-red-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">Ready to be judged?</h3>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto">
                                I will ruthlessly scan your resume for formatting errors, buzzwords, and parsing nightmares.
                            </p>
                        </div>
                        <Button onClick={handleAnalyze} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                            INITIATE SCAN
                        </Button>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
                        <p className="text-red-400 font-mono animate-pulse">PARSING DATA... HUNTING ERRORS...</p>
                    </div>
                )}

                {analysis && !loading && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        {/* Verdict Header */}
                        <div className={cn(
                            "p-4 rounded-lg border-2 text-center",
                            analysis.verdict === 'Auto-Reject'
                                ? "bg-red-950/30 border-red-600"
                                : "bg-orange-950/30 border-orange-500"
                        )}>
                            <h2 className={cn(
                                "text-3xl font-black uppercase tracking-widest",
                                analysis.verdict === 'Auto-Reject' ? "text-red-500" : "text-orange-400"
                            )}>
                                {analysis.verdict}
                            </h2>
                            <p className="mt-2 text-gray-300 italic">"{analysis.roast_summary}"</p>
                        </div>

                        {/* Critical Errors */}
                        <div className="space-y-3">
                            <h3 className="text-red-400 font-bold flex items-center gap-2">
                                <Bug className="h-4 w-4" /> CRITICAL PARSING ERRORS
                            </h3>
                            <div className="space-y-2">
                                {analysis.critical_errors.map((error, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-red-900/10 rounded border border-red-900/30">
                                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                        <span className="text-sm text-gray-300">{error}</span>
                                    </div>
                                ))}
                                {analysis.critical_errors.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No critical errors found. Unexpected.</p>
                                )}
                            </div>
                        </div>

                        {/* Buzzword Penalty */}
                        <div className="space-y-3">
                            <h3 className="text-yellow-500 font-bold flex items-center gap-2">
                                <FileWarning className="h-4 w-4" /> BUZZWORD PENALTY
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {analysis.buzzword_penalty.map((word, i) => (
                                    <Badge key={i} variant="outline" className="border-yellow-500/30 text-yellow-400 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                                        {word}
                                    </Badge>
                                ))}
                                {analysis.buzzword_penalty.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No buzzwords detected. Are you a robot too?</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                variant="outline"
                                onClick={handleAnalyze}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                                Re-Scan
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
