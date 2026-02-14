import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { TechStackExtractor } from '@/components/ai/TechStackExtractor';
import { AIRewritePopover } from '@/components/ai/AIRewritePopover';

export const ProjectsForm = () => {
    const { resume, addProject, removeProject, updateProject } = useResumeStore();
    const { projects } = resume;

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
                            <TechStackExtractor
                                value={project.link || ''}
                                onChange={(val) => updateProject(index, { link: val })}
                                onExtract={(tags) => updateProject(index, { technologies: tags })}
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
                            <AIRewritePopover
                                onRewrite={(text) => updateProject(index, { description: text })}
                                initialText={project.description}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                >
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    Enhance with AI
                                </Button>
                            </AIRewritePopover>
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
