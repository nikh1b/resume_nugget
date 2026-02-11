'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PortfolioConfig, Resume } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getOrCreatePortfolio(): Promise<PortfolioConfig> {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    let portfolio = await prisma.portfolio.findUnique({
        where: { userId: session.user.id },
    });

    if (!portfolio) {
        // Generate a slug from the user's name or email
        const baseName = session.user.name || session.user.email?.split('@')[0] || 'user';
        const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        portfolio = await prisma.portfolio.create({
            data: {
                userId: session.user.id,
                slug: `${slug}-${Date.now().toString(36)}`,
                heroHeadline: '',
                aboutHtml: '',
                primaryColor: '#7c3aed',
                fontFamily: 'Inter',
            },
        });
    }

    return {
        id: portfolio.id,
        slug: portfolio.slug,
        heroHeadline: portfolio.heroHeadline || '',
        aboutHtml: portfolio.aboutHtml || '',
        primaryColor: portfolio.primaryColor,
        fontFamily: portfolio.fontFamily,
        isPublished: portfolio.isPublished,
    };
}

export async function savePortfolio(data: Omit<PortfolioConfig, 'id'> & { id: string }) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    try {
        await prisma.portfolio.update({
            where: { id: data.id, userId: session.user.id },
            data: {
                slug: data.slug,
                heroHeadline: data.heroHeadline,
                aboutHtml: data.aboutHtml,
                primaryColor: data.primaryColor,
                fontFamily: data.fontFamily,
                isPublished: data.isPublished,
            },
        });

        revalidatePath('/dashboard');
        revalidatePath(`/p/${data.slug}`);
        return { success: true };
    } catch (error) {
        console.error('Error saving portfolio:', error);
        return { success: false, error: 'Failed to save portfolio' };
    }
}

export async function getPublicPortfolio(slug: string) {
    const portfolio = await prisma.portfolio.findUnique({
        where: { slug },
        include: {
            user: {
                include: {
                    resumes: {
                        orderBy: { updatedAt: 'desc' },
                        take: 1, // Get the latest resume
                    },
                },
            },
        },
    });

    if (!portfolio || !portfolio.isPublished) return null;

    // Increment view count
    await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { viewCount: { increment: 1 } },
    });

    const latestResume = portfolio.user.resumes[0];
    const resumeContent = latestResume
        ? (latestResume.content as unknown as Omit<Resume, 'id'>)
        : null;

    return {
        portfolio: {
            heroHeadline: portfolio.heroHeadline || '',
            aboutHtml: portfolio.aboutHtml || '',
            primaryColor: portfolio.primaryColor,
            fontFamily: portfolio.fontFamily,
            slug: portfolio.slug,
        },
        user: {
            name: portfolio.user.name || '',
            email: portfolio.user.email,
            avatarUrl: portfolio.user.image || '',
        },
        resume: resumeContent,
    };
}
