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

const journalSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    journal: {
        type: String,
    },
    date:{
        type: Date
    },
    insight: {
        type: String,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Journal = mongoose.models.Journal || mongoose.model('Journal', journalSchema);

export { User, Journal };
