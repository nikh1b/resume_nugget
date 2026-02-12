'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Resume } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function saveResume(resume: Resume) {
    // Allow demo mode saving (no-op)
    if (resume.id === 'demo') {
        return { success: true };
    }

    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    try {
        if (resume.id) {
            // Update existing resume
            await prisma.resume.update({
                where: {
                    id: resume.id,
                    userId: session.user.id,
                },
                data: {
                    content: resume as any, // resume object matches the deeply nested structure
                    title: resume.personalInfo.fullName || 'Untitled Resume',
                },
            });
        }
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error saving resume:', error);
        return { success: false, error: 'Failed to save resume' };
    }
}

export async function createNewResume() {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const defaultContent: Omit<Resume, 'id'> = {
        personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '' },
        education: [],
        experience: [],
        skills: [],
        projects: [],
    };

    const newResume = await prisma.resume.create({
        data: {
            userId: session.user.id,
            title: 'Untitled Resume',
            content: defaultContent as any,
        },
    });

    // Return the id so we can redirect
    return newResume;
}

export async function getResume(id: string) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const resume = await prisma.resume.findUnique({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!resume) return null;

    // Type coercion: content is Json, but we know it's Resume
    const content = resume.content as unknown as Omit<Resume, 'id'>;
    return { ...content, id: resume.id } as Resume;
}

export async function getUserResumes() {
    const session = await auth();
    if (!session?.user?.id) return [];

    const resumes = await prisma.resume.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return resumes.map((resume) => ({
        ...resume,
        content: resume.content as unknown as Omit<Resume, 'id'>,
    }));
}
