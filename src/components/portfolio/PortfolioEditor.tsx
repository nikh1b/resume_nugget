'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, Eye, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PortfolioConfig, Resume, THEME_PRESETS, ThemePreset } from '@/lib/types';
import { savePortfolio } from '@/app/actions/portfolio';
import { toast } from 'sonner';

interface PortfolioEditorProps {
    initialPortfolio: PortfolioConfig;
    resume: Resume | null;
    userName: string;
}

const FONT_OPTIONS = ['Inter', 'Georgia', 'Roboto Mono', 'Playfair Display', 'Space Grotesk'];

export default function PortfolioEditor({ initialPortfolio, resume, userName }: PortfolioEditorProps) {
    const [portfolio, setPortfolio] = useState<PortfolioConfig>(initialPortfolio);
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const update = (field: keyof PortfolioConfig, value: string | boolean) => {
        setPortfolio(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await savePortfolio(portfolio);
            if (result.success) {
                toast.success('Portfolio saved!');
            } else {
                toast.error(result.error || 'Failed to save');
            }
        } catch {
            toast.error('An error occurred');
        } finally {
            setIsSaving(false);
        }
    };

    const activePreset = (Object.entries(THEME_PRESETS) as [ThemePreset, typeof THEME_PRESETS[ThemePreset]][])
        .find(([, v]) => v.primaryColor === portfolio.primaryColor)?.[0];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 bg-[#111] flex items-center justify-between px-5 shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back
                        </Button>
                    </Link>
                    <span className="text-gray-600">|</span>
                    <span className="text-lime-400 font-extrabold text-sm">PORTFOLIO</span>
                    <span className="text-white font-extrabold text-sm">EDITOR</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-gray-300 hover:bg-white/5"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Eye className="h-4 w-4 mr-1" /> {showPreview ? 'Editor' : 'Preview'}
                    </Button>
                    {portfolio.isPublished && (
                        <Link href={`/p/${portfolio.slug}`} target="_blank">
                            <Button variant="outline" size="sm" className="border-white/10 text-lime-400 hover:bg-white/5">
                                <ExternalLink className="h-4 w-4 mr-1" /> View Live
                            </Button>
                        </Link>
                    )}
                    <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-lime-500 hover:bg-lime-400 text-black font-bold">
                        {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
                        Save
                    </Button>
                </div>
            </div>

            {showPreview ? (
                /* Preview */
                <div className="flex-1 overflow-y-auto">
                    <PortfolioPreview portfolio={portfolio} resume={resume} userName={userName} />
                </div>
            ) : (
                /* Editor */
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-2xl mx-auto space-y-8">
                        {/* Publish Toggle */}
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-lime-400" />
                                    <div>
                                        <p className="text-white font-semibold">Publish Portfolio</p>
                                        <p className="text-xs text-gray-500">Make it accessible at /p/{portfolio.slug}</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={portfolio.isPublished}
                                    onCheckedChange={(v: boolean) => update('isPublished', v)}
                                />
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
                            <h2 className="text-white font-bold text-lg">Basic Info</h2>
                            <div className="space-y-2">
                                <Label className="text-gray-400">URL Slug</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 text-sm">/p/</span>
                                    <Input
                                        value={portfolio.slug}
                                        onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        className="bg-white/5 border-white/10 text-white"
                                        placeholder="your-name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-400">Hero Headline</Label>
                                <Input
                                    value={portfolio.heroHeadline}
                                    onChange={(e) => update('heroHeadline', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="Full-Stack Developer & Designer"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-400">About Section</Label>
                                <Textarea
                                    value={portfolio.aboutHtml}
                                    onChange={(e) => update('aboutHtml', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white min-h-[120px]"
                                    placeholder="Write a brief introduction about yourself..."
                                />
                            </div>
                        </div>

                        {/* Theme */}
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
                            <h2 className="text-white font-bold text-lg">Theme</h2>

                            {/* Color Presets */}
                            <div className="space-y-2">
                                <Label className="text-gray-400">Color Preset</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(Object.entries(THEME_PRESETS) as [ThemePreset, typeof THEME_PRESETS[ThemePreset]][]).map(
                                        ([key, preset]) => (
                                            <button
                                                key={key}
                                                onClick={() => update('primaryColor', preset.primaryColor)}
                                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${activePreset === key
                                                    ? 'border-white/30 bg-white/10'
                                                    : 'border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full shrink-0"
                                                    style={{ backgroundColor: preset.primaryColor }}
                                                />
                                                <div className="text-left">
                                                    <p className="text-white text-sm font-medium">{preset.label}</p>
                                                    <p className="text-gray-500 text-xs">{preset.description}</p>
                                                </div>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Custom Color */}
                            <div className="space-y-2">
                                <Label className="text-gray-400">Custom Color</Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={portfolio.primaryColor}
                                        onChange={(e) => update('primaryColor', e.target.value)}
                                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                                    />
                                    <Input
                                        value={portfolio.primaryColor}
                                        onChange={(e) => update('primaryColor', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white w-32"
                                    />
                                </div>
                            </div>

                            {/* Font */}
                            <div className="space-y-2">
                                <Label className="text-gray-400">Font Family</Label>
                                <div className="grid grid-cols-1 gap-2">
                                    {FONT_OPTIONS.map((font) => (
                                        <button
                                            key={font}
                                            onClick={() => update('fontFamily', font)}
                                            className={`text-left px-4 py-2.5 rounded-lg border transition-all text-sm ${portfolio.fontFamily === font
                                                ? 'border-white/30 bg-white/10 text-white'
                                                : 'border-white/10 text-gray-400 hover:border-white/20'
                                                }`}
                                            style={{ fontFamily: font }}
                                        >
                                            {font}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resume Status */}
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                            <h2 className="text-white font-bold text-lg mb-2">Linked Resume</h2>
                            {resume ? (
                                <p className="text-gray-400 text-sm">
                                    Your portfolio will display data from: <span className="text-white font-medium">{resume.personalInfo.fullName || 'Untitled Resume'}</span>
                                </p>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No resume found. <Link href="/builder/resume/new" className="text-lime-400 hover:underline">Create one first</Link> to populate your portfolio.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---- Inline Preview Component ---- */

function PortfolioPreview({
    portfolio,
    resume,
    userName,
}: {
    portfolio: PortfolioConfig;
    resume: Resume | null;
    userName: string;
}) {
    const color = portfolio.primaryColor;
    const name = resume?.personalInfo.fullName || userName || 'Your Name';

    return (
        <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: portfolio.fontFamily }}>
            {/* Hero */}
            <div className="relative py-24 px-8 text-center border-b border-white/5">
                <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at center top, ${color}, transparent 70%)` }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">{name}</h1>
                    {portfolio.heroHeadline && (
                        <p className="text-xl md:text-2xl font-medium" style={{ color }}>{portfolio.heroHeadline}</p>
                    )}
                    {resume?.personalInfo.email && (
                        <p className="text-gray-500 mt-4 text-sm">{resume.personalInfo.email}</p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-16 space-y-16">
                {/* About */}
                {portfolio.aboutHtml && (
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>About</h2>
                        <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{portfolio.aboutHtml}</p>
                    </section>
                )}

                {/* Experience */}
                {resume && resume.experience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Experience</h2>
                        <div className="space-y-6">
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-white font-bold">{exp.position}</h3>
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

                {/* Projects */}
                {resume && resume.projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-white font-bold">{proj.name}</h3>
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
                        <h2 className="text-2xl font-bold text-white mb-4" style={{ borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>Skills</h2>
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
                    <p className="text-gray-600 text-xs">
                        Built with <span className="text-white font-bold">RESUME</span><span className="text-yellow-400 font-bold">_NUGGET</span>
                    </p>
                </footer>
            </div>
        </div>
    );
}
