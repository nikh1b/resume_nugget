"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/useResumeStore";
import { generateInterviewQuestions } from "@/app/actions/ai";
import { Loader2, MessageSquare, BrainCircuit, ChevronRight, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export function InterviewPrepModal() {
    const { resume } = useResumeStore();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [activeQuestion, setActiveQuestion] = useState(0);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await generateInterviewQuestions(JSON.stringify(resume));
            if (result.success && result.questions) {
                setQuestions(result.questions);
                setActiveQuestion(0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden border-white/10 text-gray-300 hover:bg-white/5 hover:text-white md:flex">
                    <BrainCircuit className="mr-2 h-4 w-4 text-orange-400" />
                    Predict Questions
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col bg-[#111] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <BrainCircuit className="h-6 w-6 text-orange-400" />
                        AI Interview Predictor
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        The AI analyzes your resume claims to predict tough interview questions.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {questions.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                            <div className="h-20 w-20 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <MessageSquare className="h-10 w-10 text-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Ready to practice?</h3>
                                <p className="text-gray-400 max-w-sm mx-auto text-sm">
                                    We'll scan your resume for complex claims and generate 5 challenging questions a recruiter might ask.
                                </p>
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[150px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    "Generate Questions"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-1 gap-6 overflow-hidden pt-4">
                            {/* Question List (Sidebar) */}
                            <div className="w-1/3 border-r border-white/10 pr-4 space-y-2 overflow-y-auto">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Questions</h4>
                                {questions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveQuestion(i)}
                                        className={`w-full text-left p-3 rounded-lg text-sm transition-all ${activeQuestion === i
                                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                : 'hover:bg-white/5 text-gray-400 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="mt-0.5 text-xs opacity-50">0{i + 1}</span>
                                            <span className="line-clamp-2">{q.question}</span>
                                        </div>
                                    </button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuestions([])}
                                    className="w-full mt-4 border-dashed border-white/20 text-gray-400"
                                >
                                    Start Over
                                </Button>
                            </div>

                            {/* Active Question Area */}
                            <div className="flex-1 flex flex-col overflow-y-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-orange-400 font-medium bg-orange-500/10 px-2 py-1 rounded w-fit">
                                            <HelpCircle className="h-3 w-3" />
                                            Targeting: "{questions[activeQuestion].targetedClaim}"
                                        </div>
                                        <h3 className="text-xl font-semibold leading-relaxed">
                                            {questions[activeQuestion].question}
                                        </h3>
                                        <p className="text-sm text-gray-400 border-l-2 border-white/10 pl-3 italic">
                                            AI Context: {questions[activeQuestion].context}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Your Practice Answer</label>
                                        <Textarea
                                            placeholder="Type your answer here to practice articulate responses..."
                                            className="min-h-[200px] bg-[#0a0a0a] border-white/10 resize-none focus:border-orange-500/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
