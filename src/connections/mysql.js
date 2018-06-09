import mysql from 'mysql';
import {sqlScripts as scripts} from '../../scripts';
let connection;
try {
    // MySQL Setup
    connection = mysql.createConnection({
        host: process.env.SQLHOST,
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        port: process.env.SQLPORT,
        database: process.env.SQLDATABASE
    });
    connection.connect(() => {
        console.log('MySQL connected');
    });
    // Create Tables
    Object.keys(scripts).forEach(script => {
        connection.query(scripts[script], console.log);
    });
    
}catch(e) {
    console.warn(e);
}

export default connection;