import fs from 'fs';
import path from 'path';
export const table1 = fs.readFileSync(path.resolve(__dirname, './table1.sql')).toString();
export const table1toN = fs.readFileSync(path.resolve(__dirname, './table1toN.sql')).toString();
export const table2 = fs.readFileSync(path.resolve(__dirname, './table2.sql')).toString();
export const tableNtoN = fs.readFileSync(path.resolve(__dirname, './tableNtoN.sql')).toString();
