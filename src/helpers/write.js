import fs from 'fs';
import {parse} from 'json2csv';
import path from 'path';


export default function writeCsv (fileName, jsonData, fields) {
    console.log(jsonData);
    const table = parse(jsonData, {fields: fields || Object.keys(jsonData[0]), excelStrings: true, delimiter: ';', header: false});
    fs.writeFile(path.resolve(__dirname, '../../', fileName), table + '\n', {flag: 'a'}, console.log);
}