import { getPublicPortfolio } from '@/app/actions/portfolio';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getPublicPortfolio(slug);
    if (!data) return { title: 'Portfolio Not Found' };

    return {
        title: `${data.user.name} — Portfolio`,
        description: data.portfolio.heroHeadline || `${data.user.name}'s portfolio`,
        openGraph: {
            title: `${data.user.name} — Portfolio`,
            description: data.portfolio.heroHeadline || `${data.user.name}'s portfolio`,
        },
    };
}

export default async function PublicPortfolioPage({ params }: Props) {
    const { slug } = await params;
    const data = await getPublicPortfolio(slug);
    if (!data) notFound();

    const { portfolio, user, resume } = data;
    const color = portfolio.primaryColor;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: portfolio.fontFamily }}>
            {/* Hero */}
            <div className="relative py-24 px-8 text-center border-b border-white/5">
                <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at center top, ${color}, transparent 70%)` }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                        {resume?.personalInfo.fullName || user.name}
                    </h1>
                    {portfolio.heroHeadline && (
                        <p className="text-xl md:text-2xl font-medium" style={{ color }}>{portfolio.heroHeadline}</p>
                    )}
                    <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                        {resume?.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                        {resume?.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
                        {resume?.personalInfo.linkedin && (
                            <a href={resume.personalInfo.linkedin.startsWith('http') ? resume.personalInfo.linkedin : `https://${resume.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color }}>
                                LinkedIn ↗
                            </a>
                        )}
                        {resume?.personalInfo.website && (
                            <a href={resume.personalInfo.website.startsWith('http') ? resume.personalInfo.website : `https://${resume.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color }}>
                                Website ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-16 space-y-16">
                {/* About - specialized 'Origin Story' style */}
                {portfolio.aboutHtml && (
                    <section className="relative overflow-hidden rounded-3xl bg-[#0d0d0d] border border-white/5 p-8 md:p-12 mb-20 group">
                        {/* Subtle Glow */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent blur-3xl opacity-50 pointer-events-none" style={{ '--tw-gradient-from': `${color}22` } as React.CSSProperties}></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[2px] w-8 bg-current" style={{ color }}></div>
                                    <span className="text-sm font-mono tracking-widest uppercase font-bold" style={{ color }}>PROFESSIONAL SUMMARY</span>
                                </div>

                                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase max-w-4xl break-words">
                                    {portfolio.heroHeadline || 'FULL STACK DEV.'}
                                </h2>

                                <div className="prose prose-invert prose-lg max-w-none border-l-2 border-white/10 pl-6 ml-1">
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-light text-lg md:text-xl">
                                        "{portfolio.aboutHtml}"
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <Link href="/" className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-wider text-sm rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-lg shadow-white/5 no-underline">
                                        Understood
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Why I Built This */}
                <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Why I Built This</h2>
                    <p className="text-gray-400 leading-relaxed font-light text-lg">
                        I built this platform to create a developer-centric resume tool that respects your time and data. Most resume builders lock essential features behind paywalls or force generic templates. ResumeNugget leverages AI to enhance your content and provides clean, ATS-friendly designs for free. Built with Next.js and serverless architecture, it's designed for performance, security, and developer freedom.
                    </p>
                </section>

                {/* Experience */}
                {resume && resume.experience.length > 0 && (
                    <section id="experience" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Experience</h2>
                        <div className="space-y-4">
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold">{exp.position}</h3>
                                            <p className="text-sm" style={{ color }}>{exp.company}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 shrink-0">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    {exp.description && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume && resume.education.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Education</h2>
                        <div className="space-y-4">
                            {resume.education.map((edu, i) => (
                                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold">{edu.institution}</h3>
                                            <p className="text-sm" style={{ color }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 shrink-0">{edu.startDate} — {edu.endDate}</span>
                                    </div>
                                    {edu.description && <p className="text-gray-400 text-sm mt-3">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resume && resume.projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold">{proj.name}</h3>
                                        {proj.link && (
                                            <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color }}>
                                                View ↗
                                            </a>
                                        )}
                                    </div>
                                    {proj.description && <p className="text-gray-400 text-sm mb-3">{proj.description}</p>}
                                    {proj.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.technologies.map((tech, j) => (
                                                <span key={j} className="text-xs px-2 py-0.5 rounded-full border" style={{ color, borderColor: `${color}33` }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill, i) => (
                                <span key={i} className="px-4 py-1.5 rounded-full text-sm font-medium border" style={{ color, borderColor: `${color}44`, backgroundColor: `${color}11` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="text-center pt-8 border-t border-white/5">
                    <p className="text-gray-600 text-xs">Built with ResumeNugget</p>
                </footer>
            </div>
        </div>
    );
}
