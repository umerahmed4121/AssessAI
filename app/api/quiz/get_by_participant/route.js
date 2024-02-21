import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const data = await req.json();
        const { participant_id } = data;
        const quizzes = await Quiz.find({
            'participants.participant_id': participant_id
          });
        if (quizzes) {
            const respQuizzes = quizzes.map(quiz => {
                const participant = quiz.participants.find(participant => participant.participant_id === participant_id);
                if (participant) {
                    quiz = { ...quiz._doc, responseStatus: participant.responseStatus}
                }
                return quiz;
            });
            return new Response(JSON.stringify(respQuizzes), {
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