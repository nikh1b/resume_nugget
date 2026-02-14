
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowLeft, Zap, Shield, Heart, Sparkles, Target, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-lime-500/30 selection:text-lime-200">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Logo />
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="text-gray-400 hover:text-white gap-2 hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </nav>

            <main className="relative">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Hero Section */}
                <section className="pt-24 pb-32 px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-lime-400 mb-8 animate-fade-in-up">
                        <Sparkles className="w-3 h-3" />
                        The Story Behind The Code
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">
                        ABOUT <span className="text-white">RESUME</span> <span className="text-yellow-400">NUGGET</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        The anti-gatekeeping resume builder. <br className="hidden md:block" />
                        Professional tools. <span className="text-white font-semibold">Zero cost.</span> Infinite possibilities.
                    </p>
                </section>

                {/* The Mission Grid */}
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* The Problem (Left) */}
                        <div className="space-y-8 sticky top-32">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <div className="p-3 bg-red-500/10 rounded-2xl">
                                    <Shield className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold">The Problem</h2>
                            </div>

                            <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed">
                                <p>
                                    Searching for a job is soul-crushing enough. You shouldn't have to fight your resume builder too.
                                </p>
                                <p>
                                    We realized most resume builders follow a <span className="text-red-400 font-medium">predatory pattern</span>:
                                </p>
                                <ul className="space-y-4 list-none pl-0">
                                    <li className="flex items-start gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                                            <span className="text-red-500 text-sm font-bold">✕</span>
                                        </div>
                                        <span>They lure you in with a "free" builder.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                                            <span className="text-red-500 text-sm font-bold">✕</span>
                                        </div>
                                        <span>They wait until you've spent hours perfecting your resume.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                                            <span className="text-red-500 text-sm font-bold">✕</span>
                                        </div>
                                        <span>They hit you with a paywall just to download the PDF.</span>
                                    </li>
                                </ul>
                                <p className="text-white font-medium border-l-4 border-red-500 pl-4 py-1">
                                    We believe your data belongs to you. Basic career tools should be accessible to everyone, regardless of their budget.
                                </p>
                            </div>
                        </div>

                        {/* The Solution (Right) */}
                        <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:border-lime-500/30 transition-all duration-500 shadow-2xl">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-lime-500/10 rounded-2xl">
                                        <Zap className="w-6 h-6 text-lime-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold">The Solution</h2>
                                </div>

                                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                                    Resume Nugget is built differently. It's a passion project designed to empower job seekers with the same high-end tools that recruiters use to filter you out.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-lime-500/20 transition-colors group/card">
                                        <div className="mb-3 p-2 bg-purple-500/10 rounded-lg w-fit group-hover/card:bg-purple-500/20 transition-colors"><Sparkles className="w-5 h-5 text-purple-400" /></div>
                                        <h3 className="text-white font-bold mb-2">Powered by Gemini</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">We leverage Google's Flash 2.5 model to rewrite your bullets with executive-level impact.</p>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-lime-500/20 transition-colors group/card">
                                        <div className="mb-3 p-2 bg-blue-500/10 rounded-lg w-fit group-hover/card:bg-blue-500/20 transition-colors"><Target className="w-5 h-5 text-blue-400" /></div>
                                        <h3 className="text-white font-bold mb-2">ATS Optimized</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Templates rigorously tested against major ATS platforms to ensure high readability.</p>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-lime-500/20 transition-colors group/card">
                                        <div className="mb-3 p-2 bg-green-500/10 rounded-lg w-fit group-hover/card:bg-green-500/20 transition-colors"><Shield className="w-5 h-5 text-green-400" /></div>
                                        <h3 className="text-white font-bold mb-2">Privacy First</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Local-first architecture. We don't sell your data. We don't track you across the web.</p>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-lime-500/20 transition-colors group/card">
                                        <div className="mb-3 p-2 bg-pink-500/10 rounded-lg w-fit group-hover/card:bg-pink-500/20 transition-colors"><Heart className="w-5 h-5 text-pink-400" /></div>
                                        <h3 className="text-white font-bold mb-2">Forever Free</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Direct PDF export. No watermarks. No trial periods. Just build and get hired.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Developer Spotlight Section */}
                <section className="py-32 border-t border-white/5 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-8 border border-white/10">
                            <span className="text-2xl">👨‍💻</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-8">Built by a Developer, for Developers</h2>

                        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
                            {/* Background decorations */}
                            <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/15 transition-all duration-700"></div>
                            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-lime-500/10 blur-[100px] rounded-full group-hover:bg-lime-500/15 transition-all duration-700"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-28 h-28 bg-gradient-to-br from-gray-800 to-black rounded-full border-4 border-[#1a1a1a] flex items-center justify-center text-4xl font-black text-white mb-8 shadow-2xl ring-4 ring-white/5">
                                    N
                                </div>

                                <blockquote className="text-2xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-3xl mb-12 font-serif italic">
                                    "I'm Nikhil. I built this because I was tired of the state of resume tools. If you find this useful, share it with a friend who's job hunting."
                                </blockquote>

                                <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                                    <a
                                        href="https://my-resume-nikhil.vercel.app/"
                                        target="_blank"
                                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-lime-500 text-lg rounded-full hover:bg-lime-400 hover:scale-105 shadow-xl shadow-lime-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                                    >
                                        <span className="mr-2">View My Portfolio</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a
                                        href="https://github.com/nikh1b"
                                        target="_blank"
                                        className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 text-lg rounded-full hover:bg-white/10 hover:border-white/20"
                                    >
                                        Star on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 text-center border-t border-white/5 bg-[#050505]">
                <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Resume Nugget. Open Source & Forever Free.</p>
            </footer>
        </div>
    );
}
