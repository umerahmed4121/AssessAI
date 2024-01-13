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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    birthday: {
        type: Date,
        required: true,
        trim: true,
        minlength: 6
    },
    picture: {
        type: String,
        required: false,
        trim: true,
        minlength: 6
    },
});

const User = models.User || model("User", userSchema);

export default User;