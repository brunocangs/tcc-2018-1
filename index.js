process._debugProcess(process.pid);
import mysql from 'mysql';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as scripts from './scripts';
dotenv.config();

try {
    const connection = mysql.createConnection({
        host: process.env.SQLHOST,
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        port: process.env.SQLPORT,
        database: process.env.SQLDATABASE
    });
    
    connection.connect(console.log);
    Object.keys(scripts).forEach(script => {
        connection.query(scripts[script], console.log);
    });
    mongoose.connect(process.env.MONGOURL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Mongo Connected');
    });
}catch(e) {
    console.warn(e);
}

require('./src');