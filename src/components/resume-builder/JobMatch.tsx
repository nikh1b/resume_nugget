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
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" /> Job Match Analysis
                </CardTitle>
                <CardDescription>
                    Paste a job description to see how well your resume matches.
                </CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-y-auto space-y-4">
                {!result ? (
                    <div className="space-y-4">
                        <Textarea
                            placeholder="Paste Job Description here..."
                            className="min-h-[200px]"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <Button
                            className="w-full"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !jobDescription}
                        >
                            {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                            Analyze Match
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <span className="text-4xl font-bold">{result.score}%</span>
                            <Progress value={result.score} className="h-2" />
                            <p className="text-sm text-muted-foreground">{result.score >= 80 ? 'Great Match!' : 'Needs Improvement'}</p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-orange-500" /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.missingKeywords.length > 0 ? result.missingKeywords.map((kw: string, i: number) => (
                                    <span key={i} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full border border-orange-200">
                                        {kw}
                                    </span>
                                )) : <span className="text-xs text-muted-foreground">None! Good job.</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" /> Matching Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.matchingKeywords.map((kw: string, i: number) => (
                                    <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Suggestions</h4>
                            <ul className="list-disc pl-4 space-y-1">
                                {result.suggestions.map((suggestion: string, i: number) => (
                                    <li key={i} className="text-xs text-gray-600">{suggestion}</li>
                                ))}
                            </ul>
                        </div>

                        <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                            Analyze Another Job
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
