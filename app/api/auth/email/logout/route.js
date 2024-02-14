import { cookies } from 'next/headers'

export const DELETE = async (req, res) => {
    try {
        cookies().delete('token')
        return new Response(JSON.stringify({ message: "Logout successful" }), {
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