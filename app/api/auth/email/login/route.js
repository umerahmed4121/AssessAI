import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { verifyPassword } from "@/utils/password";

export const POST = async (req, res) => {
    const { email, password } = await req.json();

    try {
        await connectToDB();
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" },
                status: 404,
                body:{
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
        return new Response(JSON.stringify({
                id: user._id,
                name: user.name,
                email: user.email,
                birthday: user.birthday
        }), {
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

