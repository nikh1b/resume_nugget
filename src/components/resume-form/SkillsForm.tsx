import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeStore } from '@/store/useResumeStore';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

export const SkillsForm = () => {
    const { resume, addSkill, removeSkill } = useResumeStore();
    const { skills } = resume;
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            addSkill(newSkill.trim());
            setNewSkill('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="flex gap-2">
                <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a skill (e.g. React, Python)"
                />
                <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                        <button
                            onClick={() => removeSkill(index)}
                            className="ml-2 hover:text-destructive focus:outline-none"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};
