import {Table1} from './schemas';
import {mysql} from './connections';
import scripts from '../scripts';
console.log(scripts);
let a = new Date();
Table1.find({})
    .then((...args) => console.log(new Date() - a, args));
