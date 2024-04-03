import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Journal' }]
});



const User = mongoose.models.User || mongoose.model('User', userSchema);

export default  User;
