export default function insertMultiple (tableName, quantity, fields, values) {
    if (!values) {
        values = Object.keys([... new Array(quantity)]).map(() => {
            return [];
        });
    }
    let insert = `insert into ${tableName}`;
    if(fields) {
        insert += '(' + fields.join(', ') + ')';
    }
    return [[insert, ' values ?'].join(''), [values]];
}