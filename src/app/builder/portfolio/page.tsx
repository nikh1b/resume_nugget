import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getOrCreatePortfolio } from '@/app/actions/portfolio';
import { getUserResumes } from '@/app/actions/resume';
import PortfolioEditor from '@/components/portfolio/PortfolioEditor';
import { Resume } from '@/lib/types';

export default async function PortfolioPage() {
    const session = await auth();
    if (!session?.user) redirect('/api/auth/signin');

    const portfolio = await getOrCreatePortfolio();
    const resumes = await getUserResumes();

    // Get the latest resume content for preview
    const latestResume = resumes[0]
        ? { ...(resumes[0].content as unknown as Omit<Resume, 'id'>), id: resumes[0].id }
        : null;

    return (
        <PortfolioEditor
            initialPortfolio={portfolio}
            resume={latestResume as Resume | null}
            userName={session.user.name || ''}
        />
    );
}
