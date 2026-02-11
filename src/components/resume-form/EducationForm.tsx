import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = () => {
    const { resume, addEducation, removeEducation, updateEducation } = useResumeStore();
    const { education } = resume;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Education</h2>
            {education.map((edu, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive"
                        onClick={() => removeEducation(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, { institution: e.target.value })}
                                placeholder="University Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, { degree: e.target.value })}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => updateEducation(index, { fieldOfStudy: e.target.value })}
                                placeholder="Computer Science"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    type="date"
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    type="date"
                                    value={edu.endDate}
                                    onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={edu.description || ''}
                            onChange={(e) => updateEducation(index, { description: e.target.value })}
                            placeholder="Activities, societies, etc."
                        />
                    </div>
                </div>
            ))}
            <Button
                variant="outline"
                className="w-full"
                onClick={() => addEducation()}
            >
                <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
        </div>
    );
};
