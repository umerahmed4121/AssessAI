import { Schema, model, models } from 'mongoose';


const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    creator_id: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    participants: {
        type: [{
            participant_id: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            responseStatus: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
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
                minlength: 3
            },
            answer: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
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
                        minlength: 3
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