"use server";

import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";
import { redirect } from 'next/navigation';
import { generateToken } from "@/utils/jwt";


export const POST = async (req, resp) => {

    try {
        await connectToDB();

        const { participant_id, quiz_id } = await req.json();

        
        let isValid = false;
        const quiz = await Quiz.findById(quiz_id);

        quiz.participants.map((participant, index) => {
            if (participant.participant_id === participant_id) {
                if (participant.responseStatus === "PENDING") {
                    isValid = true;
                    participant.responseStatus = "STARTED";
                }
            }
        });
        if (isValid) {

            if (quiz.isAcceptingResponses) {
                quiz.assessments.map((assessment, index) => {
                    if (assessment.responses) {
                        assessment.responses.push({ participant_id: participant_id, answer: "" });
                    } else {
                        assessment.responses = [{ participant_id: participant_id, answer: "" }];
                    }

                });


                await quiz.save();
                const token = await generateToken({
                    participant_id: participant_id,
                    quiz_id: quiz_id
                });
        
        
                return new Response(JSON.stringify({ 
                    isSuccess: true,
                    url: `/quiz/${token}`
                 }), {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                });
            }
            else {
                return new Response(JSON.stringify({
                    isSuccess: false,
                    message: "Quiz is not accepting responses"
                }), {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                });
            }


        }else{
            return new Response(JSON.stringify({
                isSuccess: false,
                message: "The quiz is not accessible"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 401
            });
        }



    } catch (error) {
        console.log(error);
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