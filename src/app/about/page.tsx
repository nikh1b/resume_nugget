import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowLeft, CheckCircle2, Zap, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Logo />
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="text-gray-400 hover:text-white gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </nav>

            <main className="flex-1 max-w-4xl mx-auto px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        ABOUT <span className="text-lime-400">RESUME NUGGET</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        The anti-gatekeeping resume builder. Professional tools, zero cost.
                    </p>
                </div>

                <div className="space-y-20">
                    {/* The Problem */}
                    <section className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="p-2 bg-red-500/10 rounded-lg text-red-500"><Shield className="w-6 h-6" /></span>
                            The Problem
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Searching for a job is already stressful enough. You shouldn't have to fight your resume builder too.
                            </p>
                            <p>
                                Most resume builders follows a predatory pattern:
                            </p>
                            <ul className="space-y-3 pl-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✕</span>
                                    <span>They let you build a resume for "free"</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✕</span>
                                    <span>They wait until you're finished and ready to download</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✕</span>
                                    <span>They hit you with a paywall just to get a PDF</span>
                                </li>
                            </ul>
                            <p>
                                We believe your data belongs to you, and basic career tools should be accessible to everyone.
                            </p>
                        </div>
                    </section>

                    {/* The Solution */}
                    <section className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="p-2 bg-lime-500/10 rounded-lg text-lime-500"><Zap className="w-6 h-6" /></span>
                            The Solution
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Resume Nugget is built differently. It's a passion project designed to empower job seekers with the same tools that recruiters use.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="p-6 bg-black/50 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2">Powered by NVIDIA NIM</h3>
                                    <p className="text-sm text-gray-400">We use advanced AI models (MiniMax) to rewrite your bullet points, making them punchy and professional.</p>
                                </div>
                                <div className="p-6 bg-black/50 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2">ATS Optimized</h3>
                                    <p className="text-sm text-gray-400">Our templates are tested against Application Tracking Systems to ensure your resume gets read by humans.</p>
                                </div>
                                <div className="p-6 bg-black/50 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2">Privacy First</h3>
                                    <p className="text-sm text-gray-400">Your data is stored securely. We don't sell your info to recruiters or third parties.</p>
                                </div>
                                <div className="p-6 bg-black/50 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2">Direct PDF Export</h3>
                                    <p className="text-sm text-gray-400">Download your resume directly. No watermarks. No hidden fees. No nonsense.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Personal Note */}
                    <section className="text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Built by a Developer, for Developers</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                            I'm Nikhil. I built this because I was tired of the state of resume tools. If you find this useful, share it with a friend who's job hunting.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="https://github.com/nikh1b" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black">
                                    Check out my GitHub
                                </Button>
                            </a>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5 text-center bg-[#0a0a0a]">
                <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Resume Nugget. Built by Nikhil.</p>
            </footer>
        </div>
    );
}
