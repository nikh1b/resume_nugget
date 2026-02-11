'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Chrome, Lock } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/Logo';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        setIsLoading('google');
        await signIn('google', { callbackUrl: '/dashboard' });
    };

    const handleDevLogin = async () => {
        setIsLoading('dev');
        await signIn('credentials', {
            email: 'dev@example.com',
            callbackUrl: '/dashboard'
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-8 hover:opacity-90 transition-opacity">
                <Logo />
            </Link>

            <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue building your resume</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleGoogleLogin}
                        disabled={!!isLoading}
                        className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold text-base rounded-xl flex items-center justify-center gap-3 transition-all"
                    >
                        {isLoading === 'google' ? (
                            <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Chrome className="h-5 w-5" />
                        )}
                        Sign in with Google
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#111] text-gray-500">Or use Dev Login</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleDevLogin}
                        disabled={!!isLoading}
                        variant="outline"
                        className="w-full h-12 border-lime-500/20 text-lime-400 hover:bg-lime-500/10 font-bold text-base rounded-xl flex items-center justify-center gap-3 transition-all"
                    >
                        {isLoading === 'dev' ? (
                            <div className="h-5 w-5 border-2 border-lime-400/30 border-t-lime-400 rounded-full animate-spin" />
                        ) : (
                            <Lock className="h-5 w-5" />
                        )}
                        Dev Login (Bypass)
                    </Button>
                    <p className="text-xs text-center text-gray-600 mt-2">
                        Use this if Google Sign-In is not configured correctly.
                    </p>
                </div>
            </div>

            <p className="mt-8 text-gray-500 text-sm">
                By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}
