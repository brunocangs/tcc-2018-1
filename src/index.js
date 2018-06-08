import {Table1} from './schemas';
let a = new Date();
Table1.find({})
    .then((...args) => console.log(new Date() - a, args));