"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, Bot, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { chatWithGoldenBot } from "@/app/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BOT_MESSAGES = [
    "Need a hand with that resume?",
    "I can help you beat the ATS bots!",
    "Stuck? Try using the AI Rewrite tool.",
    "Want to see how your resume scores?",
    "Psst... I found a typo. Just kidding, but I can check!"
];

export function GoldenBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState(BOT_MESSAGES[0]);
    const [inputValue, setInputValue] = useState("");
    const [position, setPosition] = useState<'left' | 'right'>('right');
    const [verticalPos, setVerticalPos] = useState<number | null>(null); // Track Y position
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);

    const pathname = usePathname();
    const router = useRouter();
    const { setATSSimulatorOpen, setActiveRewriteTarget } = useUIStore();

    // Timer Refs
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const randomTimer = useRef<NodeJS.Timeout | null>(null);

    // --- 1. Random Appearance Logic ---
    useEffect(() => {
        if (hasInteracted) return;

        const scheduleNextPop = () => {
            const delay = Math.random() * (300000 - 120000) + 120000; // 2-5 minutes

            randomTimer.current = setTimeout(() => {
                triggerBot();
                scheduleNextPop();
            }, delay);
        };

        scheduleNextPop();

        return () => {
            if (randomTimer.current) clearTimeout(randomTimer.current);
        };
    }, [hasInteracted]);

    // --- 2. Stuck/Inactivity Logic ---
    useEffect(() => {
        const resetInactivity = () => {
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            if (!isVisible && !isOpen) {
                inactivityTimer.current = setTimeout(() => {
                    triggerBot("You seem quiet. Need any help?");
                }, 60000); // 60 seconds
            }
        };

        window.addEventListener("mousemove", resetInactivity);
        window.addEventListener("keydown", resetInactivity);
        window.addEventListener("click", resetInactivity);

        resetInactivity();

        return () => {
            window.removeEventListener("mousemove", resetInactivity);
            window.removeEventListener("keydown", resetInactivity);
            window.removeEventListener("click", resetInactivity);
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        };
    }, [isVisible, isOpen]);

    // --- 3. Dynamic Edge Detection Logic with Hysteresis ---
    useEffect(() => {
        if (pathname !== '/' || isOpen || hasInteracted) return;

        const handleMouseMove = (e: MouseEvent) => {
            const showThreshold = 20; // Show if closer than this
            const hideThreshold = 300; // Hide if further than this
            const width = window.innerWidth;

            // SHOW Logic
            if (e.clientX < showThreshold) {
                if (!isVisible) {
                    setPosition('left');
                    const y = Math.min(Math.max(e.clientY - 100, 100), window.innerHeight - 200);
                    setVerticalPos(y);
                    triggerBot("Leaving so soon? Don't forget your resume!");
                }
            }
            else if (e.clientX > width - showThreshold) {
                if (!isVisible) {
                    setPosition('right');
                    const y = Math.min(Math.max(e.clientY - 100, 100), window.innerHeight - 200);
                    setVerticalPos(y);
                    triggerBot("New here? Let me show you around!");
                }
            }
            // HIDE Logic
            else if (e.clientX > hideThreshold && e.clientX < width - hideThreshold) {
                if (isVisible && !isOpen) {
                    // Only hide if it was an edge trigger (we can assume it was if !isOpen and visible, 
                    // or we could add a specific flag, but this is safe enough for now as long as random timer didn't JUST fire)
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [pathname, isVisible, isOpen, hasInteracted]);


    const triggerBot = (customMessage?: string) => {
        if (isOpen) return;

        setMessage(customMessage || BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)]);

        // If it's a generic trigger (not edge), reset vertical pos to bottom
        if (!customMessage) {
            setPosition(Math.random() > 0.5 ? 'right' : 'left');
            setVerticalPos(null);
        }

        setIsVisible(true);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setIsOpen(false);
        setHasInteracted(true);
    };

    // --- 4. AI & Action Logic ---
    const processAction = (actionType: string, actionTarget: string) => {
        if (actionType === 'NAVIGATE' && actionTarget) {
            router.push(actionTarget);
        }
        else if (actionType === 'TRIGGER_FEATURE') {
            if (actionTarget === 'open_rewrite_modal') {
                if (pathname.includes('/builder')) {
                    setActiveRewriteTarget('summary');
                } else {
                    router.push('/builder/resume/demo');
                    setTimeout(() => setActiveRewriteTarget('summary'), 1000);
                }
            }
            if (actionTarget === 'open_ats_simulator') {
                setATSSimulatorOpen(true);
            }
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isThinking) return;

        const userText = inputValue;
        setInputValue("");
        setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
        setIsThinking(true);

        try {
            // Create a timeout promise that rejects after 15 seconds
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), 15000)
            );

            // Race the API call against the timeout
            const result: any = await Promise.race([
                chatWithGoldenBot(userText, {
                    currentPage: pathname,
                    activeField: null
                }),
                timeoutPromise
            ]);

            if (result.success && result.data) {
                const { goldenbot_message, action_type, action_target } = result.data;

                setChatHistory(prev => [...prev, { role: 'bot', text: goldenbot_message }]);
                processAction(action_type, action_target);
            } else {
                // Use the server-provided error message if available, otherwise generic
                const errorMsg = result.data?.goldenbot_message || "I'm having a little trouble connecting. Try again?";
                setChatHistory(prev => [...prev, { role: 'bot', text: errorMsg }]);
            }
        } catch (error) {
            console.error("GoldenBot client error:", error);
            setChatHistory(prev => [...prev, { role: 'bot', text: "I'm taking too long to think. Check your connection?" }]);
        } finally {
            setIsThinking(false);
        }
    };

    // --- Render ---
    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={cn(
                "fixed z-50 flex items-end gap-4 transition-all duration-500 ease-out",
                position === 'left' ? "left-6" : "right-6 flex-row-reverse"
            )}
            style={{
                top: verticalPos ? `${verticalPos}px` : 'auto',
                bottom: verticalPos ? 'auto' : '1.5rem' // Default bottom-6 -> 1.5rem
            }}
        >
            {/* Avatar Trigger */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                className="relative cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Pulse Animation */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-20 duration-1000"></span>

                <div className="h-14 w-14 bg-[#111] border-2 border-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent"></div>
                    <Bot className="h-8 w-8 text-yellow-400" />
                </div>

                {/* Notification Dot */}
                {!isOpen && isVisible && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 border-2 border-[#0a0a0a] rounded-full"></span>
                )}
            </motion.div>

            {/* Chat Window or Bubble */}
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="bg-[#111] border border-white/10 rounded-2xl w-80 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 bg-yellow-500/10 border-b border-yellow-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-yellow-400" />
                                <span className="font-bold text-yellow-400">GoldenBot</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Chat Body */}
                        <div className="p-4 pb-0 h-64 overflow-y-auto space-y-3 flex flex-col">
                            {/* Initial Message */}
                            <div className="self-start bg-white/5 text-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[85%]">
                                {message}
                            </div>

                            {chatHistory.map((msg, i) => (
                                <div key={i} className={cn(
                                    "px-4 py-2 text-sm rounded-2xl max-w-[85%]",
                                    msg.role === 'user'
                                        ? "self-end bg-yellow-500 text-black rounded-tr-sm"
                                        : "self-start bg-white/5 text-gray-200 rounded-tl-sm"
                                )}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/10">
                            <div className="relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={isThinking ? "Thinking..." : "Ask me to do something..."}
                                    disabled={isThinking}
                                    className="bg-[#050505] border-white/10 pr-10 focus-visible:ring-yellow-400/50"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isThinking}
                                    className="absolute right-1 top-1 h-7 w-7 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg disabled:opacity-50"
                                >
                                    {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    /* Initial Bubble Tooltip */
                    <motion.div
                        initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-[#111] border border-white/10 px-4 py-3 rounded-xl shadow-xl max-w-[200px] relative"
                    >
                        <p className="text-sm text-gray-200">{message}</p>
                        <button
                            onClick={handleDismiss}
                            className="absolute -top-2 -right-2 bg-gray-600 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                        >
                            <X className="h-3 w-3 text-white" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
