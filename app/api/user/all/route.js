import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req, resp) => {

    try {
        await connectToDB();
        const user = await User.find({role: "student"})
        if (user) {
            return new Response(JSON.stringify(user), {
                headers: { "Content-Type": "application/json" },
                status: 200
            });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            error: error
        });
    }

}