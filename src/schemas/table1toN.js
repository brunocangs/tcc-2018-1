import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table1'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('table1toN', schema);