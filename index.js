// process._debugProcess(process.pid);
console.clear();
process.on('uncaughtException', (except) => {
    console.warn(except);
});
process.on('unhandledRejection', (except) => {
    console.warn(except);
});
import dotenv from 'dotenv';
dotenv.config();
require('./src/connections');