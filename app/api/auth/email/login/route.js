"use server"

import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { verifyPassword } from "@/utils/password";
import { generateToken } from "@/utils/jwt";
import { cookies } from 'next/headers'

export const POST = async (req, res) => {
    const { email, password } = await req.json();


    try {
        await connectToDB();
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" },
                status: 404,
                error: "User not found"
            });
        }
        if (user.provider !== 'email') {
            return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" },
                status: 404,
                error: "User not found"
            });
        }
        const match = await verifyPassword(password, user.password);
        if (!match) {
            return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" },
                status: 401,
                message: "Invalid password"
            });
        }
        // Authentication successful
        const token = await generateToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            birthday: user.birthday
        });
        // Delete all cookies
        const cookiesList = cookies()
        const hasCookie = cookiesList.has('__Secure-next-auth.session-token')
        if (hasCookie) {
            cookiesList.delete('__Secure-next-auth.session-token')
        }
        const hasCookieDev = cookiesList.has('next-auth.session-token')
        if (hasCookieDev) {
            cookiesList.delete('next-auth.session-token')
        }
        cookies().set('token', token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000) // 24 hours
        })
        return new Response(JSON.stringify(
            {
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    birthday: user.birthday
                }
            }
        ), {
            headers: { "Content-Type": "application/json" },
            status: 200,
            message: "Login successful"
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            error: error
        });
    }
}

