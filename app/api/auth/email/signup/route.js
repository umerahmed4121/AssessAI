import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, res) => {

    const { name, email, password, birthday } = await req.json();

    try {
        await connectToDB();

        const userExists = await User.findOne({ email });
        if (userExists) {
            return new Response(JSON.stringify(userExists), {
                headers: { "Content-Type": "application/json" },
                status: 409,
                body:{
                    message: "User already exists"
                }
            });
        }

        const user = new User({
            name,
            email,
            password,
            birthday
        });
        await user.save();

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            error: error
        });
    }



}