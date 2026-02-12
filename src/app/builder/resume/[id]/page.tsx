import { auth } from '@/auth';
import { createNewResume, getResume } from '@/app/actions/resume';
import ResumeEditor from '@/components/resume-builder/ResumeEditor';
import { notFound, redirect } from 'next/navigation';

export default async function ResumeBuilderPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = await params;
    const { template } = await searchParams;

    // DEMO MODE: Redirect 'new' -> 'demo'
    if (id === 'new') {
        const templateParam = template ? `?template=${template}` : '';
        redirect(`/builder/resume/demo${templateParam}`);
    }

    // DEMO MODE: Bypass Auth & DB for 'demo'
    if (id === 'demo') {
        const demoResume = {
            id: 'demo',
            personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '' },
            education: [],
            experience: [],
            skills: [],
            projects: [],
        };
        return <ResumeEditor initialData={demoResume as any} id="demo" initialTemplate={typeof template === 'string' ? template : undefined} />;
    }

    // ORIGINAL LOGIC (Kept for reference, but won't be reached if using demo)
    const session = await auth();
    if (!session?.user) {
        redirect('/api/auth/signin');
    }

    const resume = await getResume(id);
    if (!resume) {
        notFound();
    }

    return <ResumeEditor initialData={resume} id={id} initialTemplate={typeof template === 'string' ? template : undefined} />;
}
