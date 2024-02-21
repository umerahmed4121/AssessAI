import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";

export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const { participant_id, quiz_id, assessments } = await req.json();
        console.log("route",participant_id, quiz_id, assessments);

        const quiz = await Quiz.findById(quiz_id);
        if(quiz.isAcceptingResponses){

            quiz.participants.map((participant, index) => {
                if (participant.participant_id === participant_id) {
                    
                    if (participant.responseStatus === "STARTED") {
                        participant.responseStatus = "RESPONDED";
                    }
                }
            });

            quiz.assessments.map((assessment, index) => {

                const respIndex = assessment.responses.findIndex(response => response.participant_id === participant_id);
                if(index !== -1){
                    assessment.responses[respIndex].answer = assessments[index].answer;
                }
               
            });
            await quiz.save();
            return new Response(JSON.stringify({
                isSubmitted:true
            }), {
                headers: { "Content-Type": "application/json" },
                status: 200
            });
        }
        else{
            return new Response(JSON.stringify({
                isSubmitted:false
            }), {
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

// export const PUT = async (req, resp) => {

//     try {
//         await connectToDB()
//         const data = await req.json();
//         const { _id } = data;
//         const quiz = await Quiz.findByIdAndUpdate(_id, data)
//         return new Response(JSON.stringify({message: "Quiz updated"}), {
//             headers: { "Content-Type": "application/json" },
//             status: 200
//         });

//     } catch (error) {
//         return new Response(JSON.stringify(error), {
//             headers: { "Content-Type": "application/json" },
//             status: 500,
//             error: error
//         });
//     }

// }