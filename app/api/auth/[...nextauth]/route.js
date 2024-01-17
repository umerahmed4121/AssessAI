import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import GoogleUser from "@/models/user-google";
import GithubUser from "@/models/user-github";
import { connectToDB } from "@/utils/database";

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
            const sessionGoogleUser = await GoogleUser.findOne({ email: session.user.email });
            if (sessionGoogleUser !== null) {
                session.user.id = sessionGoogleUser._id.toString()
                return session
                
            }
            const sessionGithubUser = await GithubUser.findOne({ email: session.user.email });
            if (sessionGithubUser !== null) {
                session.user.id = sessionGithubUser._id.toString()
                return session
                
            }

        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                console.log({ user, account, profile, email, credentials });
                await connectToDB();
                if (account?.provider === 'google') {
                    const userExist = await GoogleUser.findOne({ email: profile.email });
                    if (!userExist) {
                        await GoogleUser.create({
                            name: profile.name,
                            email: profile.email,
                            picture: profile.picture,
                        })
                        return true
                    }
                } else if (account?.provider === 'github') {
                    const userExist = await GithubUser.findOne({ email: profile.email });
                    if (!userExist) {
                        await GithubUser.create({
                            name: user.name,
                            email: user.email,
                            picture: user.image,
                        })
                        return true
                    }
                }
                // router.push('/dashboard')
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    },redirect: {
        signIn: '/dashboard',
        signOut: '/',
        error: '/auth/error',
    },

})

export { handler as GET, handler as POST }