import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const { 
            creator_id,
            title,
            description,
            participants,
            assessments,
            isAcceptingResponses
        
        } = await req.json();
        const quiz = new Quiz({
            creator_id: creator_id,
            title: title,
            description: description,
            participants: participants,
            assessments: assessments,
            isAcceptingResponses: isAcceptingResponses
        });
        await quiz.save();
        return new Response(JSON.stringify({message: "Quiz created"}), {
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

export const PUT = async (req, resp) => {

    try {
        await connectToDB()
        const data = await req.json();
        const { _id } = data;
        const quiz = await Quiz.findByIdAndUpdate(_id, data)
        return new Response(JSON.stringify({message: "Quiz updated"}), {
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