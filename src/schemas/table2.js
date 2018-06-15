import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('table2', schema);