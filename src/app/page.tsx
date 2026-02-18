'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Target, Sparkles, ArrowRight, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from '@/components/Logo';
import { motion } from 'framer-motion';
import { TemplatesCarousel } from '@/components/TemplatesCarousel';
import { DemoReel } from '@/components/home/DemoReel';

export default function Home() {
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "#templates", label: "Templates" },
    { href: "/about", label: "About" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col overflow-x-hidden selection:bg-lime-500/30 selection:text-lime-200">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl"
      >
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
            >
              <Link href={link.href} className="hover:text-white transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3"
        >
          <Link href="/builder/resume/demo" className="hidden sm:block">
            <Button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 rounded-full text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(132,204,22,0.3)]">
              Start Building
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0a] border-white/10 w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/5">
                  <Logo />
                </div>
                <div className="flex-1 flex flex-col p-6 gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-lg font-bold text-gray-400 hover:text-white transition-colors block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <Link href="/builder/resume/demo">
                    <Button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-full mt-4">
                      Start Building
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </motion.nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-24 md:py-32 text-center relative overflow-hidden">
        {/* Hero Background Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-8 drop-shadow-2xl"
          >
            BUILD KILLER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">RESUMES.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mt-4 mb-2 leading-relaxed font-light"
          >
            The AI-powered resume builder that helps you craft <span className="text-white font-medium">ATS-optimized</span> resumes in minutes.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lime-400 font-semibold text-sm tracking-widest uppercase mb-10"
          >
            AI-enhanced. ATS-optimized. Recruiter-approved.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link href="/builder/resume/demo">
              <Button className="bg-white text-black hover:bg-gray-200 font-bold px-10 h-14 text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 active:scale-95">
                Start Building Now
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-medium px-10 h-14 text-lg rounded-full backdrop-blur-sm transition-colors">
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>



      {/* Feature Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 pb-32 max-w-7xl mx-auto w-full relative z-10"
      >
        {[
          { icon: FileText, color: "text-red-400", bg: "bg-red-500/10", title: "Resume Builder", desc: "Drag-and-drop editor with live preview", link: "/builder/resume/demo" },
          { icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10", title: "AI Enhancer", desc: "Rewrite bullet points with powerful AI", link: "/builder/resume/demo" },
          { icon: Target, color: "text-blue-400", bg: "bg-blue-500/10", title: "Job Matching", desc: "Match score + missing keyword analysis", link: "/builder/resume/demo?open=job-match" },
          { icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10", title: "PDF Export", desc: "Premium templates, instant download", link: "/builder/resume/demo" }
        ].map((feature, i) => (
          <motion.div variants={fadeInUp} key={i}>
            <Link href={feature.link} className="group bg-[#111]/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 cursor-pointer block hover:bg-[#111] hover:-translate-y-2 relative overflow-hidden h-full">
              {/* Hover Gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent to-white pointer-events-none`}></div>

              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className={`p-4 rounded-2xl ${feature.bg} transition-transform group-hover:scale-110 duration-500`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <span className="text-white font-bold text-lg">{feature.title}</span>
                <span className="text-gray-500 text-sm leading-relaxed">{feature.desc}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Templates Showcase Section */}
      <TemplatesCarousel />

      {/* Demo Reel Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 my-32 relative z-20">
        <DemoReel />
      </div>

      {/* About Section */}
      <section id="about" className="py-32 border-t border-white/5 scroll-mt-32 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              CRAFTED WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">CODE & SOUL.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Resume Nugget wasn't built by a faceless corporation. It was forged to break the cycle of expensive, gatekept career tools.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
          >
            {[
              { icon: Zap, color: "text-lime-400", bg: "bg-lime-500/10", border: "hover:border-lime-500/30", bgHover: "group-hover:bg-lime-500/20", title: "The Anti-Gatekeeper", desc: "Most builders hold your PDF hostage behind a paywall. We don't. Your data, your file, your career. 100% Free." },
              { icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/30", bgHover: "group-hover:bg-purple-500/20", title: "Powered by Gemini", desc: "We leverage Google's Gemini 2.5 Flash to analyze your intent, rewrite your impact, and match keywords with recruiter-level precision." },
              { icon: Target, color: "text-blue-400", bg: "bg-blue-500/10", border: "hover:border-blue-500/30", bgHover: "group-hover:bg-blue-500/20", title: "Privacy at Core", desc: "No tracking pixels. No selling data to recruiters. Your resume data stays local and secure. Built for developers, by a developer." }
            ].map((item, i) => (
              <motion.div variants={fadeInUp} key={i}>
                <div className={`bg-[#111] border border-white/10 p-8 rounded-3xl ${item.border} transition-all group h-full`}>
                  <div className={`h-12 w-12 ${item.bg} rounded-2xl flex items-center justify-center mb-6 ${item.bgHover} transition-colors`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Developer Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-lime-500/20 transition-all duration-700">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-lime-500/10 transition-colors duration-700"></div>

              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-800 border-4 border-[#1a1a1a] overflow-hidden shadow-2xl relative">
                    {/* Avatar Placeholder or Initials */}
                    <Image
                      src="/face.png"
                      alt="Nikhil"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 bg-lime-500 text-black text-xs font-bold px-3 py-1 rounded-full border-4 border-[#111]"
                  >
                    CREATOR
                  </motion.div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-black text-white mb-2">Designed by Nikhil</h3>
                  <p className="text-lime-400 font-medium mb-6 tracking-wide uppercase text-sm">Full Stack Developer & Open Source Enthusiast</p>

                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    "I believe software should empower, not exploit. I poured hundreds of hours of love into Resume Nugget to give you the unfair advantage in your job search."
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                    <a
                      href="https://my-resume-nikhil.vercel.app/"
                      target="_blank"
                      className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-lime-600 font-lg rounded-full hover:bg-lime-500 focus:outline-none ring-offset-2 focus:ring-2 ring-lime-400"
                    >
                      <span className="mr-2">View My Portfolio</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="https://github.com/nikh1b"
                      target="_blank"
                      className="inline-flex items-center justify-center px-8 py-3 font-bold text-gray-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 focus:outline-none"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center bg-[#050505] relative z-20">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Resume Nugget. Built by Nikhil.</p>
      </footer>
    </div >
  );
}
