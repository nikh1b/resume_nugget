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
        <aside className="w-64 border-r bg-gray-50/40 hidden md:block">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <div className="scale-75 origin-left">
                        <Logo />
                    </div>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                pathname === item.href ? "bg-gray-100 text-gray-900 font-semibold" : ""
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
