import { headers } from 'next/headers';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function DebugPage() {
    const headersList = await headers();
    const session = await auth();

    let dbStatus = "Checking...";
    try {
        await prisma.user.count();
        dbStatus = "Connected (OK)";
    } catch (e: any) {
        dbStatus = `Failed: ${e.message}`;
    }

    const envVars = {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        VERCEL_URL: process.env.VERCEL_URL,
        NODE_ENV: process.env.NODE_ENV,
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
        // Check for presence of secrets
        HAS_AUTH_SECRET: !!process.env.AUTH_SECRET,
        HAS_GOOGLE_ID: !!process.env.GOOGLE_CLIENT_ID,
        HAS_GOOGLE_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        DB_STATUS: dbStatus
    };

    const requestHeaders = {
        host: headersList.get('host'),
        'x-forwarded-host': headersList.get('x-forwarded-host'),
        'x-forwarded-proto': headersList.get('x-forwarded-proto'),
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono text-sm">
            <h1 className="text-2xl font-bold mb-8 text-red-500">DEBUG CONSOLE</h1>

            <div className="grid gap-8">
                <section className="border border-white/10 p-6 rounded-xl bg-white/5">
                    <h2 className="text-xl font-bold mb-4 text-lime-400">Environment Variables</h2>
                    <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(envVars, null, 2)}
                    </pre>
                </section>

                <section className="border border-white/10 p-6 rounded-xl bg-white/5">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Request Headers</h2>
                    <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(requestHeaders, null, 2)}
                    </pre>
                </section>

                <section className="border border-white/10 p-6 rounded-xl bg-white/5">
                    <h2 className="text-xl font-bold mb-4 text-amber-400">Auth Session</h2>
                    <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </section>
            </div>
        </div>
    );
}
