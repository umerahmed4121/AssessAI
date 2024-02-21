import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const data = await req.json();
        const { creator_id } = data;
        const quizzes = await Quiz.find({ creator_id: creator_id});
        return new Response(JSON.stringify(quizzes), {
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