import { connectToDB } from "@/utils/database";
import { cookies } from 'next/headers'
import { generateToken } from "@/utils/jwt";
import User from "@/models/user";

export const POST = async (req, res) => {

    const { name, email, password, birthday, role } = await req.json();

    try {
        await connectToDB();

        const userExists = await User.findOne({ email });
        if (userExists) {
            return new Response(JSON.stringify({
                message: "USER_ALREADY_EXISTS"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 409,
                error: "USER ALREADY EXISTS",

            });
        }

        const user = new User({
            name,
            email,
            password,
            birthday,
            role,
            provider: 'email'
        });
        await user.save();
        const token = await generateToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            birthday: user.birthday
        });
        cookies().set('token', token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000) // 24 hours
        })
        return new Response(JSON.stringify(
            {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                birthday: user.birthday,
                provider: user.provider

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