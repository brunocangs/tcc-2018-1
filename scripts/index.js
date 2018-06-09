import fs from 'fs';
import path from 'path';
import insertMultiple from './insertMultiple';
import select from './select';

export const sqlScripts = {
    table1: fs.readFileSync(path.resolve(__dirname, './table1.sql')).toString(),
    table1toN: fs.readFileSync(path.resolve(__dirname, './table1toN.sql')).toString(),
    table2: fs.readFileSync(path.resolve(__dirname, './table2.sql')).toString(),
    tableNtoN: fs.readFileSync(path.resolve(__dirname, './tableNtoN.sql')).toString()
};
export default {
    insertMultiple,
    select
};