import { verifyToken } from "@/utils/jwt";
import { cookies } from 'next/headers'

export const GET = async (req, res) => {

    const cookieValue = cookies().get('token');
    const user = await verifyToken(cookieValue);
    if (user) {
        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 200,
            body: user
        });
    } else {
        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 401,
            body: {
                message: "Invalid token"
            }
        });
    }

}