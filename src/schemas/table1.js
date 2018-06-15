import mongoose from 'mongoose';
const Table1Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const model = mongoose.model('table1', Table1Schema);
export default model;
