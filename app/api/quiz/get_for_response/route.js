import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";
import { verifyToken } from "@/utils/jwt";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const { token } = await req.json();
        const tokenData = await verifyToken(token);
        if (!tokenData) {
            return new Response(JSON.stringify({
                message: "The quiz is not accessible"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 401
            });
        } else{
            const { participant_id, quiz_id } = tokenData;

            
            const quiz = await Quiz.findOne({
                _id: quiz_id,
                'participants.participant_id': participant_id, 
                'participants.responseStatus': 'STARTED'
            });
            if (quiz) {
                const respQuiz = {
                    id: quiz._id,
                    title: quiz.title,
                    description: quiz.description,
                    assessments: quiz.assessments.map(({ question, _id }) => ({ question: question, answer: "", _id: _id, })),
                }
    
                return new Response(JSON.stringify({
                    participant_id: participant_id,
                    isResponded:false,
                    quiz:respQuiz
                }), {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                });
            } else {
                return new Response(JSON.stringify(false), {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                });
            }
            
        }


        
        


    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            error: error
        });
    }

}