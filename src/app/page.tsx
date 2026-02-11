import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Target, Sparkles, ArrowRight, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

import { Logo } from '@/components/Logo';

export default function Home() {
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "#templates", label: "Templates" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/api/auth/signin" className="hidden sm:block">
            <Button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 rounded-full text-sm">
              Sign In
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-400">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0a] border-white/10 w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/5">
                  <Logo />
                </div>
                <div className="flex-1 flex flex-col p-6 gap-6">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/api/auth/signin">
                    <Button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6">
          BUILD KILLER
          <br />
          <span className="text-red-500">RESUMES.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mt-4 mb-2">
          The AI-powered resume builder that helps you craft ATS-optimized resumes in minutes.
        </p>
        <p className="text-lime-400 font-semibold text-sm mb-8">
          AI-enhanced. ATS-optimized. Recruiter-approved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/builder/resume/new">
            <Button className="bg-red-500 hover:bg-red-400 text-white font-bold px-8 h-12 text-base rounded-full">
              Start Building
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white font-medium px-8 h-12 text-base rounded-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pb-16 max-w-6xl mx-auto w-full">
        {/* ... existing feature cards ... */}
        <Link href="/builder/resume/new" className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer block">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-red-500/10">
              <FileText className="h-6 w-6 text-red-400" />
            </div>
            <span className="text-white font-semibold">Resume Builder</span>
            <span className="text-gray-500 text-xs">Drag-and-drop editor with live preview</span>
          </div>
        </Link>
        <Link href="/builder/resume/new" className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer block">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-amber-500/10">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
            <span className="text-white font-semibold">AI Enhancer</span>
            <span className="text-gray-500 text-xs">Rewrite bullet points with powerful AI</span>
          </div>
        </Link>
        <Link href="/builder/resume/new" className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer block">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-white font-semibold">Job Matching</span>
            <span className="text-gray-500 text-xs">Match score + missing keyword analysis</span>
          </div>
        </Link>
        <Link href="/builder/resume/new" className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer block">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <span className="text-white font-semibold">PDF Export</span>
            <span className="text-gray-500 text-xs">Three premium templates, instant download</span>
          </div>
        </Link>
      </div>

      {/* Templates Showcase Section */}
      <section id="templates" className="py-20 bg-black/50 border-t border-white/5 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">PREMIUM <span className="text-lime-400">TEMPLATES</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Choose from our selection of ATS-optimized templates designed to get you hired.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ivy */}
            <div className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-lime-500/50 transition-all">
              <div className="h-64 bg-white/5 flex items-center justify-center p-8">
                {/* Placeholder for template preview */}
                <div className="w-3/4 h-full bg-white shadow-xl flex flex-col p-2 gap-2">
                  <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Ivy League</h3>
                <p className="text-gray-400 text-sm mb-4">Clean, serif-based design. Perfect for academic and corporate roles.</p>
                <Link href="/builder/resume/new?template=ivy">
                  <Button size="sm" variant="outline" className="w-full border-white/10 text-white hover:bg-lime-500 hover:text-black">Use Template</Button>
                </Link>
              </div>
            </div>

            {/* Modern */}
            <div className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all">
              <div className="h-64 bg-white/5 flex items-center justify-center p-8">
                <div className="w-3/4 h-full bg-white shadow-xl flex flex-row">
                  <div className="w-1/3 bg-gray-900 h-full p-2">
                    <div className="h-8 w-8 bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-2 w-full bg-gray-700 rounded mb-1"></div>
                  </div>
                  <div className="w-2/3 p-2 flex flex-col gap-2">
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Modern Tech</h3>
                <p className="text-gray-400 text-sm mb-4">Two-column layout with a dark sidebar. Ideal for developers and designers.</p>
                <Link href="/builder/resume/new?template=modern">
                  <Button size="sm" variant="outline" className="w-full border-white/10 text-white hover:bg-purple-500 hover:text-white">Use Template</Button>
                </Link>
              </div>
            </div>

            {/* Creative */}
            <div className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-all">
              <div className="h-64 bg-white/5 flex items-center justify-center p-8">
                <div className="w-3/4 h-full bg-white shadow-xl flex flex-col">
                  <div className="h-16 w-full bg-purple-600 mb-2"></div>
                  <div className="p-2 flex flex-col gap-2">
                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Creative Studio</h3>
                <p className="text-gray-400 text-sm mb-4">Bold headers and vibrant accents. Stand out for creative positions.</p>
                <Link href="/builder/resume/new?template=creative">
                  <Button size="sm" variant="outline" className="w-full border-white/10 text-white hover:bg-red-500 hover:text-white">Use Template</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/5 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">WHY <span className="text-red-500">RESUME NUGGET?</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            I built Resume Nugget because most resume builders are frustrating. They lock features behind paywalls, force you into generic templates, or hold your data hostage.
            <br /><br />
            Resume Nugget is different. It uses <strong>NVIDIA NIM AI</strong> (MiniMax) to rewrite your descriptions, analyzes your resume against job descriptions to find missing keywords, and gives you full control over your data with direct PDF exports.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-white/5 border-b mb-8">
            <div>
              <div className="text-3xl font-black text-white">100%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Free</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">3+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Templates</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">AI</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Powered</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">ATS</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Resume Nugget. Built by Nikhil.</p>
      </footer>
    </div>
  );
}
