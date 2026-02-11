
import { PrismaClient } from '@prisma/client';
import { Resume } from '@/lib/types'; // Assuming this imports the type correctly if available

const prisma = new PrismaClient();

// Initial Resume Content Structure
const initialResumeContent = {
    personalInfo: {
        fullName: 'NIKHIL SINGH BARIHA',
        email: 'nikhil21101@iiitnr.edu.in',
        phone: '91-7999461897',
        address: 'Bilaspur, India 495001',
        linkedin: 'linkedin.com/in/nikhil-singh-bariha-6092a022a', // From image
        summary: `Versatile Full Stack Developer with a specialized focus on building scalable, cloud-native applications on Google Cloud Platform (GCP). Expertise spans the entire software development life cycle, blending React/Angular/Vue frontend development with robust serverless backends and data engineering. Proven track record in open-source contributions, designing secure API architectures, and implementing CI/CD pipelines for automated deployment. Passionate about delivering end-to-end solutions that optimize user experience while maintaining enterprise-grade security and reliability.`,
    },
    education: [
        {
            id: 'edu-1',
            institution: 'Indian Institute of Information Technology (IIIT) Naya Raipur',
            degree: 'Bachelor of Technology: Electronics and Communication Engineering',
            startDate: '2021', // Inferred from 2025 grad date
            endDate: '2025',
            fieldOfStudy: 'Electronics and Communication Engineering',
            description: 'Relevant Coursework: Digital Electronics, Embedded Systems, Signal Processing, Communication Systems, Computer Networks, Microprocessors, Circuit Design, Control Systems',
        }
    ],
    experience: [], // Keep existing or empty if none provided in images
    skills: [
        'Java', 'JavaScript', 'Python', 'C++', 'SQL',
        'Node.js', 'ExpressJS', 'RESTful APIs', 'JWT Authentication', 'API Design',
        'MongoDB', 'MySQL', 'SQLite', 'Database Design', 'Query Optimization',
        'HTML5', 'CSS3', 'AJAX', 'JSON', 'Responsive Design',
        'Android Studio', 'Visual Studio Code', 'Git', 'GitHub', 'Postman', 'MongoDB Compass',
        'Data Structures and Algorithms', 'OOP', 'DBMS',
        // Hobbies & Languages added as skills for visibility?
        'New Tech', 'Gaming', 'Hardware Modding',
        'English (Fluent)', 'Hindi (Native)'
    ],
    projects: [],
};

const hobbiesText = `

// HOBBIES AND INTERESTS
• New Tech: Trying out New Ai models and other Technologies
• Gaming: Very passionate about games since childhood
• Hardware Modding: Troubleshooting and upgrading modern gaming PC to enhance thermal performance and consistent fps.

// LANGUAGES
• English (Fluent)
• Hindi (Native)

// BADGES
• LinkedIn Skill Badges
• Google Cloud Skills Badges`;

async function main() {
    const email = 'dev@example.com';

    // 1. Find or create the user
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            name: 'NIKHIL SINGH BARIHA'
        },
        create: {
            email,
            name: 'NIKHIL SINGH BARIHA',
            image: '',
        },
    });

    console.log(`Updated user: ${user.name}`);

    // 2. Create or Update Resume
    // We need to upsert a resume. Since Resume doesn't have a unique constraint on userId in typical schema unless specified,
    // we'll findFirst and update, or create.
    const existingResume = await prisma.resume.findFirst({
        where: { userId: user.id }
    });

    if (existingResume) {
        await prisma.resume.update({
            where: { id: existingResume.id },
            data: {
                title: 'Full Stack Developer', // Default title
                content: initialResumeContent as any,
            }
        });
        console.log(`Updated resume: ${existingResume.id}`);
    } else {
        await prisma.resume.create({
            data: {
                userId: user.id,
                title: 'Full Stack Developer',
                content: initialResumeContent as any,
            }
        });
        console.log(`Created new resume`);
    }

    // 3. Create or Update Portfolio
    const portfolio = await prisma.portfolio.upsert({
        where: { userId: user.id },
        update: {
            isPublished: true,
            slug: 'nikhil-singh-bariha',
            heroHeadline: 'FULL STACK DEVELOPER.',
            aboutHtml: initialResumeContent.personalInfo.summary + hobbiesText,
            primaryColor: '#22c55e',
            fontFamily: 'Inter',
            viewCount: 156,
        },
        create: {
            userId: user.id,
            slug: 'nikhil-singh-bariha',
            isPublished: true,
            heroHeadline: 'FULL STACK DEVELOPER.',
            aboutHtml: initialResumeContent.personalInfo.summary + hobbiesText,
            primaryColor: '#22c55e',
            fontFamily: 'Inter',
        },
    });

    console.log(`Updated portfolio: ${portfolio.slug}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
