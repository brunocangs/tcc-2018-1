import {Table1, Table1toN, Table2, Indexed} from './schemas';
import scripts, {sqlScripts} from '../scripts';
import {time, write} from './helpers';
import {mysql} from './connections';
import tableIndexed from './schemas/tableIndexed';
import faker from 'faker';

const runTests = async function () {
    let results = [];
    let p = Promise.resolve();
    const array = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000];
    array.forEach(key => {
        p = p.then(async () => {
            let res = {};
            res.quantity = key;
            res.database = 'MongoDB';
            res.testName = 'Insere Multiplos';
            res.time = await time(() => {
                return Table1.insertMany([...new Array(key)].map(index => {return {}}));
            });
            results.push({...res});

            res.testName = 'Busca um';
            let random = await Table1.find({});
            let randIndex = Math.floor(Math.random() * random.length);
            random = random[randIndex];
            res.time = await time(() => {
                return Table1.findOne(random);
            });
            results.push({...res});

            res.testName = 'Deleta todos';
            res.time = await time(() => {
                return Table1.deleteMany({});
            })
            results.push({...res});

            res.testName = 'Insere Indexado';
            let inserts = [];
            for(let i = 0; i < key; i++) {
                inserts.push({
                    name: faker.name.firstName()
                });
            }
            res.time = await time(() => {
                return Indexed.insertMany(inserts);
            })
            results.push({...res});


            res.database = 'MySQL';
            res.testName = 'Insere Multiplos';
            res.time = await time(() => {
                return new Promise((resolve, reject) => {
                    mysql.query(...scripts.insertMultiple('table1', key), (...args) => {
                        resolve(args);
                    });
                })
            });
            results.push({...res});

            res.testName = 'Busca um';
            random = await new Promise((resolve) => {
                mysql.query(scripts.select('*', 'table1'), (...args) => {
                    resolve(args);
                })
            });
            random = random[1];
            randIndex = Math.floor(Math.random() * random.length);
            random = random[randIndex];
            res.time = await time(() => {
                return new Promise((resolve, reject) => {
                    mysql.query(scripts.select('*', 'table1', {id: random.id}), (...args) => {
                        resolve(args);
                    });
                })
            });
            results.push({...res});

            res.testName = 'Deleta todos';
            res.time = await time(() => {
                return new Promise((resolve, reject) => {
                    mysql.query('DELETE FROM table1', (...args) => {
                        resolve(args);
                    });
                })
            })
            results.push({...res});

            res.testName = 'Insere Indexado';
            inserts = Object.keys([...new Array(key)]).map(item => {
                return faker.name.firstName();
            });
            res.time = await time(() => {
                return new Promise((res) => {
                    mysql.query(...scripts.insertMultiple('table_indexed', null, ['name'], inserts),(...args) => {
                        res(args);
                    });
                })
            })
            results.push({...res});

            mysql.query('ALTER TABLE table1 AUTO_INCREMENT = 1');


            if (key === array[array.length - 1]) {
                write('results.csv', results, ['database', 'testName', 'quantity', 'time']);
            }
            console.log(key);
        })
    });

    return results;
}

runTests();
