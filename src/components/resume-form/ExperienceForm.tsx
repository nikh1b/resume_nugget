import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { generateExperienceDescription } from '@/app/actions/ai';
import { AIRewritePopover } from '@/components/ai/AIRewritePopover';

export const ExperienceForm = () => {
    const { resume, addExperience, removeExperience, updateExperience } = useResumeStore();
    const { experience } = resume;
    const [loadingIndices, setLoadingIndices] = useState<number[]>([]);

    const handleGenerateDescription = async (index: number) => {
        const exp = experience[index];
        if (!exp.position || !exp.company) return;

        setLoadingIndices(prev => [...prev, index]);
        try {
            const result = await generateExperienceDescription(exp.company, exp.position);
            if (result.success && result.text) {
                updateExperience(index, { description: result.text });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingIndices(prev => prev.filter(i => i !== index));
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Experience</h2>
            {experience.map((exp, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExperience(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(index, { company: e.target.value })}
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(index, { position: e.target.value })}
                                placeholder="Job Title"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    type="date"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    type="date"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(index, { endDate: e.target.value })}
                                    disabled={exp.current}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`current-${index}`}
                                checked={exp.current}
                                onChange={(e) => updateExperience(index, { current: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={`current-${index}`}>I currently work here</Label>
                        </div>
                    </div>
                    <div className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                            <Label>Description</Label>
                            <div className="flex gap-2">
                                {!exp.description && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleGenerateDescription(index)}
                                        disabled={loadingIndices.includes(index) || !exp.position || !exp.company}
                                        className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                                    >
                                        {loadingIndices.includes(index) ? (
                                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                        ) : (
                                            <Wand2 className="mr-1 h-3 w-3" />
                                        )}
                                        Generate with AI
                                    </Button>
                                )}
                                {exp.description && (
                                    <AIRewritePopover
                                        initialText={exp.description}
                                        onRewrite={(text) => updateExperience(index, { description: text })}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                        >
                                            <Sparkles className="mr-1 h-3 w-3" />
                                            Improve with AI
                                        </Button>
                                    </AIRewritePopover>
                                )}
                            </div>
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, { description: e.target.value })}
                            placeholder="Responsibilities and achievements..."
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
            ))}
            <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => addExperience()}
            >
                <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
        </div>
    );
};
