import { Schema, model, models } from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: true,
        trim: true,
        minlength: 5
    },
    birthday: {
        type: Date,
        null: true,
        required: false,
        trim: true,
        minlength: 6,
    },
    role: {
        type: String,
        null: true,
        required: false,
        trim: true,
        minlength: 6,
    },
    provider: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    picture: {
        type: String,
    },
});

const GoogleUser = models.GoogleUser || model("GoogleUser", userSchema);

export default GoogleUser;