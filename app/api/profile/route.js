import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const { id, birthday, role } = await req.json();
        const user = await User.findById(id)
        if (user) {
            user.birthday = birthday
            user.role = role
            await user.save()
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