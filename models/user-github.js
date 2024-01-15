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
    picture: {
        type: String,
    },
});

const GithubUser = models.GithubUser || model("GithubUser", userSchema);

export default GithubUser;