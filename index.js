const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b2aa8094cb4211',
    password: 'bdd6ef70',
    database: 'heroku_3ed39ac37ea8258',
    port: 3306
});

connection.connect(console.log);