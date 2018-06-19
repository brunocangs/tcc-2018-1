import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String
});

schema.index({name: 1});

export default mongoose.model('indexed', schema);