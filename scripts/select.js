export default function select (fields, from, where) {
    if (!Array.isArray(fields)) {
        fields = [fields];
    }
    if (!Array.isArray(where)) {
        where = [where];
    }
    where = where.map(condition => {
        let result;
        result = condition && '(' + Object.keys(condition).map((key) => {
            if (typeof condition[key] === 'boolean') {
                return key + ' IS ' + condition[key];
            }
            return key + ' = ' + condition[key];
        }).join(' AND ') + ')';
        return result;
    }).join(' OR ');
    fields = fields.join(',');
    let result = 'SELECT ' + fields + ' FROM ' + from;
    if (where.length) {
        result += ' WHERE ' + where;
    }
    return result;
}