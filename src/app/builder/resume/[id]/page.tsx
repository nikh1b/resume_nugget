import { auth } from '@/auth';
import { createNewResume, getResume } from '@/app/actions/resume';
import ResumeEditor from '@/components/resume-builder/ResumeEditor';
import { notFound, redirect } from 'next/navigation';

export default async function ResumeBuilderPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = await params;
    const { template } = await searchParams;
    const session = await auth();

    if (!session?.user) {
        redirect('/api/auth/signin');
    }

    if (id === 'new') {
        const newResume = await createNewResume();
        const templateParam = template ? `?template=${template}` : '';
        redirect(`/builder/resume/${newResume.id}${templateParam}`);
    }

    const resume = await getResume(id);

    if (!resume) {
        notFound();
    }

    return <ResumeEditor initialData={resume} id={id} initialTemplate={typeof template === 'string' ? template : undefined} />;
}
