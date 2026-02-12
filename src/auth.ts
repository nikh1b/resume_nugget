import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    // adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Dev Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "dev@example.com" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;
                const email = credentials.email as string;

                // Create or return existing user for dev/bypassing
                const user = await prisma.user.upsert({
                    where: { email },
                    update: {},
                    create: {
                        email,
                        name: "Dev User",
                        image: "",
                    },
                });
                return user;
            }
        })
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
