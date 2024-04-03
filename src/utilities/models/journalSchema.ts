import mongoose from 'mongoose';


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


const Journal = mongoose.models.Journal || mongoose.model('Journal', journalSchema);

export default Journal