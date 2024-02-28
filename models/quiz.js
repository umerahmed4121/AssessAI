import { Schema, model, models } from 'mongoose';


const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    creator_id: {
        type: String,
        required: true,
        trim: true,
    },
    participants: {
        type: [{
            participant_id: {
                type: String,
                required: true,
                trim: true,
            },
            responseStatus: {
                type: String,
                required: true,
                trim: true,
                enum: ["PENDING", "STARTED", "RESPONDED"]

            }
        }],
        required: false,
    },
    assessments: {
        type: [{
            question: {
                type: String,
                required: true,
                trim: true,
            },
            answer: {
                type: String,
                required: true,
                trim: true,
            },
            totalMarks: {
                type: Number,
                required: true,
                default: 0
            },
            responses: {
                type: [{
                    participant_id: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    answer: {
                        type: String,
                        required: false,
                        default: "",
                    },
                    obtainedMarks: {
                        type: Number,
                        required: true,
                        default: 0
                    },
                    aiRemarks: {
                        type: String,
                        required: false,
                        default: ""
                    },
                }],
                required: false,
                default: []
            }
        }],
        required: true,
    },
    isAcceptingResponses: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps: true,
});

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;