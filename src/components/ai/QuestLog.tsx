"use client";

import { useEffect, useState } from "react";
import { generateQuests } from "@/app/actions/ai";
import { useResumeStore } from "@/store/useResumeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sword, Scroll, Trophy, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Quest {
    id: string;
    title: string;
    description: string;
    xp: number;
    type: 'content' | 'formatting' | 'missing_section';
    completed?: boolean;
}

export function QuestLog() {
    const { resume } = useResumeStore();
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [xp, setXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const checkQuests = async () => {
        setLoading(true);
        try {
            const result = await generateQuests(JSON.stringify(resume));
            if (result.success && result.quests) {
                // Merge with existing completion state if IDs match (mock logic for now)
                setQuests(result.quests.map((q: any) => ({ ...q, completed: false })));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Level based on XP
    useEffect(() => {
        const newLevel = Math.floor(xp / 1000) + 1;
        if (newLevel > level) {
            toast.success(`Level Up! You are now Level ${newLevel}! 🚀`);
            setLevel(newLevel);
        }
    }, [xp, level]);

    const completeQuest = (id: string, reward: number) => {
        // First, mark as completed to trigger animation/visual feedback
        setQuests(prev => prev.map(q => {
            if (q.id === id && !q.completed) {
                setXP(x => x + reward);
                toast.success(`Quest Completed! +${reward} XP`);
                return { ...q, completed: true };
            }
            return q;
        }));

        // Validating the "vanish" effect - remove from list after 1 second
        setTimeout(() => {
            setQuests(prev => prev.filter(q => q.id !== id));
        }, 800);
    };

    return (
        <Card className="bg-[#111] border-white/10 text-white w-full h-full flex flex-col">
            <CardHeader className="pb-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Scroll className="h-5 w-5 text-yellow-500" />
                        Quest Log
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                            Lvl {level}
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(!isOpen)}>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
                        </Button>
                    </div>
                </div>
                {isOpen && (
                    <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>XP: {xp} / {level * 1000}</span>
                            <span>{Math.round((xp / (level * 1000)) * 100)}%</span>
                        </div>
                        <Progress value={(xp / (level * 1000)) * 100} className="h-1.5 bg-white/10" />
                    </div>
                )}
            </CardHeader>
            {isOpen && (
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {quests.length === 0 && !loading && (
                        <div className="text-center py-8 space-y-3">
                            <p className="text-sm text-gray-400">No active quests. scanning resume...</p>
                            <Button size="sm" onClick={checkQuests} className="bg-purple-600 hover:bg-purple-700">
                                <Sparkles className="mr-2 h-4 w-4" /> Summon Quests
                            </Button>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
                            <span className="text-xs">The Dungeon Master is thinking...</span>
                        </div>
                    )}

                    <div className="space-y-3">
                        {quests.map((quest) => (
                            <div
                                key={quest.id}
                                className={cn(
                                    "p-3 rounded-lg border transition-all relative overflow-hidden group",
                                    quest.completed
                                        ? "bg-green-500/5 border-green-500/20 opacity-50"
                                        : "bg-white/5 border-white/5 hover:border-purple-500/30"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={cn("font-bold text-sm", quest.completed ? "text-green-500 line-through" : "text-purple-300")}>
                                        {quest.title}
                                    </h4>
                                    <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                                        <Trophy className="h-3 w-3" /> {quest.xp} XP
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mb-3">{quest.description}</p>

                                {!quest.completed && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full h-7 text-xs border-white/10 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/50"
                                        onClick={() => completeQuest(quest.id, quest.xp)}
                                    >
                                        <CheckCircle2 className="mr-2 h-3 w-3" /> Complete
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

import { ChevronDown } from "lucide-react";
