import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import User from '@/models/user';
import { connectToDB } from "@/utils/database";
import { cookies } from 'next/headers'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async session({ session }) {
            cookies().delete('token')
            await connectToDB();
            const user = await User.findOne({ email: session.user.email });
            if (user !== null) {
                session.user.id = user._id.toString()
                session.user.birthday = user.birthday
                session.user.role = user.role
                return session
            }
        },
        async signIn({ user, account, profile, email, credentials }) {
            cookies().delete('token')
            try {
                console.log({ user, account, profile, email, credentials });
                await connectToDB();
                const userExist = await User.findOne({ email: profile.email });
                if (userExist) {
                    if (account?.provider !== userExist.provider) {
                        return false
                    }
                    return true
                } else {
                    if (account?.provider === 'google') {
                        await User.create({
                            name: profile.name,
                            email: profile.email,
                            picture: profile.picture,
                            password: null,
                            birthday: null,
                            role: null,
                            provider: 'google'
                        })
                        return true

                    } else if (account?.provider === 'github') {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            picture: user.image,
                            password: null,
                            birthday: null,
                            role: null,
                            provider: 'github'

                        })
                        return true
                    }

                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async error(error, req, res) {
            return new Response(error.toString())
          },

    },
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/auth-error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user',
    },

})

export { handler as GET, handler as POST }