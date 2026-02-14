'use client';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, CheckCircle, Search, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { analyzeJobMatch } from '@/app/actions/ai';
import { Progress } from "@/components/ui/progress"

export function JobMatch() {
    const { resume } = useResumeStore();
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!jobDescription || jobDescription.length < 50) {
            alert('Please enter a longer job description.');
            return;
        }

        setIsAnalyzing(true);
        try {
            const resumeString = JSON.stringify(resume);
            const response = await analyzeJobMatch(resumeString, jobDescription);
            if (response.success) {
                setResult(response.analysis);
            }
        } catch (error) {
            console.error('Analysis failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            {!result ? (
                <div className="space-y-4">
                    <Textarea
                        placeholder="Paste Job Description here..."
                        className="min-h-[200px] bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !jobDescription}
                    >
                        {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                        Analyze Match
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="text-center space-y-2 bg-white/5 p-6 rounded-xl border border-white/5">
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Match Score</div>
                        <span className={`text-5xl font-black ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {result.score}%
                        </span>
                        <Progress value={result.score} className="h-2 bg-white/10" />
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" /> Missing Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {result.missingKeywords.length > 0 ? result.missingKeywords.map((kw: string, i: number) => (
                                <span key={i} className="bg-red-500/10 text-red-400 text-xs px-2 py-1.5 rounded-md border border-red-500/20 font-medium">
                                    {kw}
                                </span>
                            )) : <span className="text-xs text-gray-500 italic">None! Good job.</span>}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" /> Matching Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {result.matchingKeywords.map((kw: string, i: number) => (
                                <span key={i} className="bg-green-500/10 text-green-400 text-xs px-2 py-1.5 rounded-md border border-green-500/20 font-medium">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                        <h4 className="font-bold text-sm text-blue-400 mb-2">AI Suggestions</h4>
                        <ul className="space-y-2">
                            {result.suggestions.map((suggestion: string, i: number) => (
                                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                                    <span className="mt-1 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button variant="outline" className="w-full border-white/10 text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setResult(null)}>
                        Analyze Another Job
                    </Button>
                </div>
            )}
        </div>
    );
}
