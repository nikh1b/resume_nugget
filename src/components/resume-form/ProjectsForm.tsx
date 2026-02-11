import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { enhanceDescription } from '@/app/actions/ai';

export const ProjectsForm = () => {
    const { resume, addProject, removeProject, updateProject } = useResumeStore();
    const { projects } = resume;
    const [loadingIndices, setLoadingIndices] = useState<number[]>([]);

    const handleEnhance = async (index: number, text: string) => {
        if (!text || text.length < 10) return;

        setLoadingIndices(prev => [...prev, index]);
        try {
            const result = await enhanceDescription(text);
            if (result.success && result.text) {
                updateProject(index, { description: result.text });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingIndices(prev => prev.filter(i => i !== index));
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            {projects.map((project, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProject(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input
                                value={project.name}
                                onChange={(e) => updateProject(index, { name: e.target.value })}
                                placeholder="My Awesome App"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link</Label>
                            <Input
                                value={project.link || ''}
                                onChange={(e) => updateProject(index, { link: e.target.value })}
                                placeholder="github.com/my-app"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Technologies (comma separated)</Label>
                        <Input
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(index, { technologies: e.target.value.split(',').map(s => s.trim()) })}
                            placeholder="React, Node.js, TypeScript"
                        />
                    </div>
                    <div className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                            <Label>Description</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEnhance(index, project.description)}
                                disabled={loadingIndices.includes(index) || !project.description}
                                className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            >
                                {loadingIndices.includes(index) ? (
                                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-1 h-3 w-3" />
                                )}
                                Enhance with AI
                            </Button>
                        </div>
                        <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, { description: e.target.value })}
                            placeholder="Brief description of what the project does..."
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
            ))}
            <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => addProject()}
            >
                <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
        </div>
    );
};
