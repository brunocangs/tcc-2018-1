import fs from 'fs';
import {parse} from 'json2csv';
import path from 'path';
import * as connections from '../connections';


export default function writeCsv (fileName, jsonData, fields) {
    const table = parse(jsonData, {fields: fields || Object.keys(jsonData[0]), excelStrings: true, delimiter: ';', header: false});
    fs.writeFile(path.resolve(__dirname, '../../', fileName), table + '\n', {flag: 'a'}, (...args) => {
        connections.mysql.end();
        connections.mongo.close();
    });
}