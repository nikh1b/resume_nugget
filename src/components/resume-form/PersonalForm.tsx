import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { AIRewritePopover } from '@/components/ai/AIRewritePopover';

export const PersonalForm = () => {
    const { resume, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = resume;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={personalInfo.address}
                        onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                        placeholder="New York, USA"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        value={personalInfo.linkedin || ''}
                        onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={personalInfo.website || ''}
                        onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                        placeholder="johndoe.com"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="summary">Professional Summary</Label>
                    {personalInfo.summary && (
                        <AIRewritePopover
                            initialText={personalInfo.summary}
                            onRewrite={(text) => updatePersonalInfo({ summary: text })}
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
                <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    placeholder="Brief summary of your professional background..."
                    className="min-h-[120px]"
                />
            </div>
        </div>
    );
};
