import mongoose from 'mongoose';

// MongoDB Setup
mongoose.connect(process.env.MONGOURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongo Connected');
});

export default db;