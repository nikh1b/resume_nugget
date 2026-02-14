"use client";

import { useState, useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Check, RefreshCw, Wand2, Zap, BarChart3, Scissors } from "lucide-react";
import { generateRewrite } from "@/app/actions/ai";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIRewritePopoverProps {
    onRewrite: (text: string) => void;
    children: React.ReactNode;
    initialText?: string;
    id?: string;
}

export function AIRewritePopover({
    onRewrite,
    children,
    initialText = "",
    id,
}: AIRewritePopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        action_oriented: string;
        metric_driven: string;
        concise: string;
    } | null>(null);

    const { activeRewriteTarget, setActiveRewriteTarget } = useUIStore();

    // Remote Trigger Logic
    useEffect(() => {
        if (id && activeRewriteTarget === id) {
            setIsOpen(true);
            setActiveRewriteTarget(null); // Consume the event
            toast.info("AI Rewrite activated by GoldenBot!");
        }
    }, [activeRewriteTarget, id, setActiveRewriteTarget]);

    const handleGenerate = async () => {
        if (!initialText || initialText.length < 5) {
            toast.error("Please enter some text first (at least 5 characters).");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await generateRewrite(initialText);
            if (response.success && response.variations) {
                setResult(response.variations);
            } else {
                toast.error("Failed to generate rewrite.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (text: string) => {
        onRewrite(text);
        setIsOpen(false);
        setResult(null);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-[450px] p-0 bg-[#111] border-white/10" align="start" side="bottom">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-white font-medium">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            AI Rewrite
                        </div>
                        {result && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setResult(null)}
                                className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                            >
                                Clear
                            </Button>
                        )}
                    </div>

                    {!result && !loading && (
                        <div className="flex flex-col gap-3 py-4 text-center">
                            <p className="text-sm text-gray-400">
                                Transform your text into high-impact, professional statements.
                            </p>
                            <Button
                                onClick={handleGenerate}
                                className="bg-purple-600 hover:bg-purple-500 text-white w-full"
                            >
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Improvements
                            </Button>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-3">
                            <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
                            <span className="text-xs">Analyzing and rewriting...</span>
                        </div>
                    )}

                    {result && (
                        <Tabs defaultValue="action" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-white/5">
                                <TabsTrigger value="action" className="text-xs">Action</TabsTrigger>
                                <TabsTrigger value="metric" className="text-xs">Metric</TabsTrigger>
                                <TabsTrigger value="concise" className="text-xs">Concise</TabsTrigger>
                            </TabsList>
                            <div className="mt-4 space-y-4">
                                <TabsContent value="action" className="mt-0 space-y-2">
                                    <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        <Zap className="h-3 w-3" /> Action-Oriented
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer group relative"
                                        onClick={() => handleSelect(result.action_oriented)}
                                    >
                                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white">
                                            {result.action_oriented}
                                        </p>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded">Apply</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 italic px-1">
                                        Uses strong, high-level action verbs to show leadership and initiative.
                                    </p>
                                </TabsContent>
                                <TabsContent value="metric" className="mt-0 space-y-2">
                                    <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        <BarChart3 className="h-3 w-3" /> Metric-Driven
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group relative"
                                        onClick={() => handleSelect(result.metric_driven)}
                                    >
                                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white">
                                            {result.metric_driven}
                                        </p>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">Apply</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 italic px-1">
                                        Focuses on numbers and quantifiable impact. Fill in the [brackets].
                                    </p>
                                </TabsContent>
                                <TabsContent value="concise" className="mt-0 space-y-2">
                                    <div className="flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        <Scissors className="h-3 w-3" /> Concise
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer group relative"
                                        onClick={() => handleSelect(result.concise)}
                                    >
                                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white">
                                            {result.concise}
                                        </p>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded">Apply</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 italic px-1">
                                        Short, punchy, and direct. Removes fluff.
                                    </p>
                                </TabsContent>
                            </div>
                        </Tabs>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
