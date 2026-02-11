import React from 'react';
import { FileText, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const VisualModernTemplate = () => {
    return (
        <div className="w-[500px] h-[700px] bg-white text-black p-0 shadow-2xl flex flex-row overflow-hidden text-[10px]">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-900 text-white p-6 flex flex-col gap-6">
                <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto" />

                <div className="space-y-2">
                    <div className="font-bold border-b border-slate-700 pb-1 mb-2">CONTACT</div>
                    <div className="flex items-center gap-2 text-slate-300"><Mail size={10} /> nikhil@example.com</div>
                    <div className="flex items-center gap-2 text-slate-300"><Phone size={10} /> +1 234 567 890</div>
                    <div className="flex items-center gap-2 text-slate-300"><MapPin size={10} /> San Francisco, CA</div>
                </div>

                <div className="space-y-2">
                    <div className="font-bold border-b border-slate-700 pb-1 mb-2">SKILLS</div>
                    <div className="flex flex-wrap gap-1">
                        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'].map(s => (
                            <span key={s} className="bg-slate-800 px-2 py-1 rounded text-[8px]">{s}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">NIKHIL SINGH</h1>
                    <p className="text-slate-500 font-medium">FULL STACK DEVELOPER</p>
                </div>

                <div className="space-y-2">
                    <h2 className="font-bold text-slate-900 border-b border-slate-200 pb-1">PROFESSIONAL SUMMARY</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Innovative Full Stack Developer with 5+ years of experience building high-performance web applications. Specialized in React ecosystem and AI integration. Proven track record of delivering scalable solutions.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="font-bold text-slate-900 border-b border-slate-200 pb-1">EXPERIENCE</h2>
                    <div>
                        <div className="flex justify-between font-bold text-slate-800">
                            <span>Senior Developer</span>
                            <span>2021 - Present</span>
                        </div>
                        <div className="text-slate-500 mb-1">TechCorp Inc.</div>
                        <ul className="list-disc pl-4 text-slate-600 space-y-1">
                            <li>Led a team of 5 developers to rebuild the core platform using Next.js.</li>
                            <li>Implemented AI features using NVIDIA NIM, increasing user engagement by 40%.</li>
                            <li>Optimized database queries reducing load times by 60%.</li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex justify-between font-bold text-slate-800">
                            <span>Web Developer</span>
                            <span>2019 - 2021</span>
                        </div>
                        <div className="text-slate-500 mb-1">StartUp Flow</div>
                        <ul className="list-disc pl-4 text-slate-600 space-y-1">
                            <li>Developed responsive UI components using React and Tailwind CSS.</li>
                            <li>Integrated Stripe payments processing $1M+ annually.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
