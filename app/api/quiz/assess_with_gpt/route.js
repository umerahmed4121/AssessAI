import Quiz from "@/models/quiz";
import { connectToDB } from "@/utils/database";

const { GoogleGenerativeAI } = require("@google/generative-ai");


export const POST = async (req, resp) => {

    try {
        await connectToDB();
        const data = await req.json();
        const { quiz_id } = data;
        const quiz = await Quiz.findById(quiz_id);

        // Use GPT-4 api to assess the responses of the participants and update the obtainedMarks of each response object in the responses array

        const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt1 = `

{
    question: 'What is waterfall model in software engineering',
    answer: 'The Waterfall Model was the first Process Model to be introduced. It is also referred to as a linear-sequential life cycle model. It is very simple to understand and use. In a waterfall model, each phase must be completed before the next phase can begin and there is no overlapping in the phases.',
    totalMarks: 5,
    _id: new ObjectId('65d4ea1f067c6b267c081f0e'),
    responses: [
        {
            participant_id: '65d02a90dc7921991a289b9e',
            answer: 'The Waterfall Model was the first way to plan software development. Its also called the linear-sequential life cycle model. It is easy to understand and use. In a waterfall model, you finish one phase before you start the next. There is no overlap between the phases.',
            obtainedMarks: 0,
            _id: new ObjectId('65d5ac53ff8d7783759eae29')
        },
        {
            participant_id: '65d02a90dc7921991a289b9e',
            answer: 'The Waterfall Model was the first Process Model out there. It is also known as the linear-sequential life cycle model. It is pretty easy to understand and use. In a waterfall model, you gotta finish one phase before you can start the next one. There is no overlap between the phases.',
            obtainedMarks: 0,
            _id: new ObjectId('65d5ac53ff8d7783759eae29')
        }
        {
            participant_id: '65d02a90dc7921991a289b9e',
            answer: 'The Waterfall Model was the first Process Model. It is also known as the linear-sequential life cycle model. It is pretty easy to understand and use.',
            obtainedMarks: 0,
            _id: new ObjectId('65d5ac53ff8d7783759eae29')
        }
    ]
}`

        
        for (const assessment of quiz.assessments) {
            for (const response of assessment.responses) {
                const prompt = `Compare the answer with ideal answer and give only the obtained marks out of ${assessment.totalMarks} not anything else.
                Question: ${assessment.question}
                Ideal Answer: ${assessment.answer}
                Participant Answer: ${response.answer}
                `;
                const result = await model.generateContent(prompt);
                const resp = await result.response;
                const text = resp.text();
                response.aiRemarks = text;
                console.log(response.aiRemarks);
            }
        }
        await quiz.save();


        


        return new Response(JSON.stringify(quiz), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            error: error
        });
    }

}