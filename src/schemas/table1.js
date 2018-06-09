import mongoose from 'mongoose';
import explain from 'mongoose-explain';

const Table1Schema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

Table1Schema.plugin(explain, {
    callback: (stats) => {
        stats.forEach(stat => {
            console.log(stat.executionStats.executionTimeMillis);
        });
    }
});

const model = mongoose.model('table1', Table1Schema);
export default model;
