'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/dashboard',
    },
    {
        icon: FileText,
        label: 'Resumes',
        href: '/dashboard/resumes',
    },
    {
        icon: Briefcase,
        label: 'Portfolio',
        href: '/dashboard/portfolio',
    },
    {
        icon: Settings,
        label: 'Settings',
        href: '/dashboard/settings',
    },
];

import { Logo } from '@/components/Logo';

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-white/10 bg-[#111] hidden md:block">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <div className="scale-75 origin-left">
                        <Logo />
                    </div>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium gap-1">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                                pathname === item.href
                                    ? "bg-lime-500/10 text-lime-400 font-semibold"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-lime-400" : "text-gray-500")} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
