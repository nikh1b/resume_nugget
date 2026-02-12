import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import { getUserResumes } from '@/app/actions/resume';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect('/api/auth/signin');

    // const resumes = await getUserResumes();
    const resumes: any[] = []; // Temporary fix: Bypass DB for now

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lime-400 font-extrabold text-xl tracking-tight">RESUME</span>
                    <span className="text-white font-extrabold text-xl tracking-tight">FORGE</span>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{session.user.name || session.user.email}</span>
                    <Link href="/api/auth/signout">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white">
                            Sign Out
                        </Button>
                    </Link>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-8 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 text-center sm:text-left">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your resumes and portfolio.</p>
                    </div>
                    <Link href="/builder/resume/new">
                        <Button className="bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-full px-6 w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> New Resume
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">Total Resumes</span>
                            <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="text-3xl font-black text-white mt-2">{resumes.length}</div>
                    </div>
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">Templates Used</span>
                            <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="text-3xl font-black text-white mt-2">3</div>
                        <span className="text-xs text-gray-600">Ivy • Modern • Creative</span>
                    </div>
                    <Link href="/builder/portfolio" className="bg-[#111] border border-white/10 rounded-2xl p-6 block hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">Portfolio</span>
                            <Globe className="h-4 w-4 text-lime-400" />
                        </div>
                        <div className="text-lg font-bold text-lime-400 mt-2">Edit Portfolio →</div>
                        <span className="text-xs text-gray-600">Customize theme & publish</span>
                    </Link>
                </div>

                {/* Resumes List */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-white mb-1">Your Resumes</h2>
                    <p className="text-sm text-gray-500">
                        {resumes.length === 0 ? "You haven't created any resumes yet." : `${resumes.length} resume${resumes.length > 1 ? 's' : ''} found.`}
                    </p>
                </div>

                {resumes.length === 0 ? (
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
                        <div className="p-4 rounded-full bg-white/5">
                            <FileText className="h-10 w-10 text-gray-600" />
                        </div>
                        <p className="text-gray-500">No resumes yet. Create your first one!</p>
                        <Link href="/builder/resume/new" className="w-full sm:w-auto">
                            <Button className="bg-red-500 hover:bg-red-400 text-white font-bold rounded-full px-6 w-full">
                                Create Resume
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="group bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between hover:border-white/20 transition-all duration-200 gap-4 sm:gap-0">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="p-2.5 rounded-xl bg-red-500/10 shrink-0">
                                        <FileText className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-white truncate">{resume.title || 'Untitled Resume'}</h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock className="h-3 w-3" />
                                            Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <Link href={`/builder/resume/${resume.id}`} className="w-full sm:w-auto">
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full w-full sm:w-auto">
                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
