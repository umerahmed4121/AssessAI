import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CerdentialsProvider from 'next-auth/providers/credentials'

import GoogleUser from "@/models/user-google";
import GithubUser from "@/models/user-github";
import User from "@/models/user";
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
        CerdentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectToDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return new Response(JSON.stringify(user), {
                            headers: { "Content-Type": "application/json" },
                            status: 404,
                            body: {
                                message: "User not found"
                            }
                        });
                    }
                    if (!verifyPassword(password, user.password)) {
                        return new Response(JSON.stringify(user), {
                            headers: { "Content-Type": "application/json" },
                            status: 401,
                            message: "Invalid password"
                        });
                    }
                    if (credentials?.email === user.email && credentials?.password === user.password) {
                        return user
                    } else {
                        return null
                    }
                    // // Authentication successful
                    // const token = generateToken({ 
                    //     id: user._id,
                    //     name: user.name,
                    //     email: user.email,
                    //     birthday: user.birthday 
                    // });
                    // cookies().set('token',token)
                    // return new Response(JSON.stringify(token), {
                    //     headers: { "Content-Type": "application/json" },
                    //     status: 200,
                    //     message: "Login successful"
                    // });
                } catch (error) {
                    return new Response(JSON.stringify(error), {
                        headers: { "Content-Type": "application/json" },
                        status: 500,
                        error: error
                    });
                }
            }
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await GoogleUser.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString()
            return session

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

                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    }

})

export { handler as GET, handler as POST }