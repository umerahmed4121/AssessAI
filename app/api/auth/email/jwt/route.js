import { verifyToken } from "@/utils/jwt";
import { cookies } from 'next/headers'

export const GET = async (req, res) => {

    try {
        const cookieValue = cookies().get('token');
        if (cookieValue) {
            if (cookieValue.value !== undefined) {
                const user = await verifyToken(cookieValue.value);
                if (user) {
                    return new Response(JSON.stringify(user), {
                        headers: { "Content-Type": "application/json" },
                        status: 200,
                        body: user
                    });
                } else {
                    return new Response(JSON.stringify(false), {
                        headers: { "Content-Type": "application/json" },
                        status: 200,
                        body: {
                            message: "Invalid token"
                        }
                    });
                }
            }

        } else {
            return new Response(JSON.stringify(false), {
                headers: { "Content-Type": "application/json" },
                status: 200,
                body: {
                    message: "Invalid token"
                }
            });
        }
    } catch (error) {

        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            body: {
                message: "Internal Server Error"
            }
        });
    }


}