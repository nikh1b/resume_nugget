"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractTechStack } from "@/app/actions/ai";
import { Loader2, Wand2, Code2 } from "lucide-react";
import { toast } from "sonner";

interface TechStackExtractorProps {
    value?: string;
    onChange?: (value: string) => void;
    onExtract: (tags: string[]) => void;
}

export function TechStackExtractor({ value, onChange, onExtract }: TechStackExtractorProps) {
    // If controlled, use props; otherwise query internal state (though we intend to use it controlled)
    const [internalUrl, setInternalUrl] = useState("");

    const inputValue = value !== undefined ? value : internalUrl;

    const handleChange = (val: string) => {
        if (onChange) onChange(val);
        else setInternalUrl(val);
    };

    const [loading, setLoading] = useState(false);

    const handleExtract = async () => {
        if (!inputValue) return;
        setLoading(true);
        try {
            const result = await extractTechStack(inputValue);
            if (result.success && result.technologies) {
                onExtract(result.technologies);
                toast.success(`Found ${result.technologies.length} technologies`);
            } else {
                toast.error("Could not extract technologies.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Extraction failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2 items-center w-full">
            <Input
                placeholder="GitHub Repo or Project URL"
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 bg-white/5 border-white/10"
            />
            <Button
                size="icon"
                variant="outline"
                onClick={handleExtract}
                disabled={!inputValue || loading}
                type="button"
                className="shrink-0 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                title="Auto-Detect Tech Stack"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Code2 className="h-4 w-4 text-blue-400" />}
            </Button>
        </div>
    );
}
