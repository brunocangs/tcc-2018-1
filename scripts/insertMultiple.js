export default function insertMultiple (tableName, quantity, values) {
    if (!values) {
        values = Object.keys([... new Array(quantity)]).map(() => {
            return [];
        });
    }
    return [['insert into ', ' values ?'].join(tableName), [values]];
}