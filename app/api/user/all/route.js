import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        const data = await req.json();
        const { user_id } = data;
        await connectToDB();
        const creator = await User.findOne({ _id: user_id, role: "teacher" });
        if (creator) {
            const users = await User.find({ role: "student" })
            if (users) {
                return new Response(JSON.stringify(users), {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                });
            }
        } else{
            return new Response(JSON.stringify({message:"User not found"}), {
                headers: { "Content-Type": "application/json" },
                status: 404
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