import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: [true, 'Email already existed'],
        uniqueCaseInsensitive: true,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 Characters'],

    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists'],
        minLength: [3, 'Username must be at least 3 Characters'],
        match: [
            /^[a-zA-Z0-9]+$/,
            'Username must contain only letters and numbers and underscore'
        ]
    },
    avatar: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    }
}, { timestamps: true });

userSchema.pre('save', async function saveUser() {
    const user = this;

    if(user.isNew) {
        const SALT = await bcrypt.genSaltSync(9);
        const hashedPasswrord = await bcrypt.hashSync(user.password, SALT);
        user.password = hashedPasswrord;

        user.avatar = `https://robohash.org/${user.username}`;

        user.verificationToken = uuidv4().substring(0, 10).toUpperCase();

        user.verificationTokenExpiry = Date.now() + 3600000 // 1 hour
    }
});

const User = mongoose.model('User', userSchema);

export default User;