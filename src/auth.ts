import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    // adapter: PrismaAdapter(prisma), // Disabled for Safety Mode
    session: { strategy: "jwt" },
    debug: true, // Enable debug logs
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
})
