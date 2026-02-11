import { PersonalForm } from './PersonalForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { UploadResume } from './UploadResume';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ResumeForm = () => {
    return (
        <ScrollArea className="h-full pr-4">
            <div className="space-y-6 pb-10">
                <UploadResume />
                <Separator className="bg-white/10" />
                <PersonalForm />
                <Separator className="bg-white/10" />
                <EducationForm />
                <Separator className="bg-white/10" />
                <ExperienceForm />
                <Separator className="bg-white/10" />
                <SkillsForm />
                <Separator className="bg-white/10" />
                <ProjectsForm />
            </div>
        </ScrollArea>
    );
};
