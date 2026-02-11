'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { enhanceDescription } from '@/app/actions/ai';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface EnhanceButtonProps {
    text: string;
    onEnhance: (enhancedText: string) => void;
    className?: string;
}

export function EnhanceButton({ text, onEnhance, className }: EnhanceButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleEnhance = async () => {
        if (!text || text.trim().length < 5) return;

        setIsLoading(true);
        try {
            // Need to change this to a server action import since we can't emit from client easily
            // Actually enhancing happens on server, returns text.
            const result = await enhanceDescription(text);
            if (result.success && result.text) {
                onEnhance(result.text);
            } else {
                // handle error, toast etc
                console.error('Enhance failed');
            }
        } catch (error) {
            console.error('Enhance error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleEnhance}
            disabled={isLoading || !text}
            className={`text-purple-600 hover:text-purple-700 hover:bg-purple-50 ${className}`}
        >
            {isLoading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Sparkles className="mr-2 h-3 w-3" />}
            Enhance with AI
        </Button>
    );
}
