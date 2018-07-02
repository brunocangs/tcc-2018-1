import {Table1, Table1toN, Table2} from './schemas';
import scripts, {sqlScripts} from '../scripts';
import {time, write} from './helpers';
import {mysql} from './connections';
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
            randIndex = random[randIndex];
            res.time = await time(() => {
                return Table1.findOne(randIndex);
            });
            results.push({...res});

            res.testName = 'Join 1 - N';
            randIndex = Math.floor(Math.random() * random.length);

            await Table1toN.insertMany([...new Array(key)].map(index => {return {target: random[randIndex]._id}}));
            res.time = await time(() => {
                return Table1toN.aggregate([{
                    $match: {}
                }, {
                    $lookup: {
                        from: 'table1',
                        localField: 'target',
                        foreignField: '_id',
                        as: 'target'
                    }
                }]);
            });
            results.push({...res});
            console.log(await Table1toN.collection.createIndex({target: 1}));
            res.testName = 'Join 1 - N Indexado';
            res.time = await time(() => {
                return Table1toN.aggregate([{
                    $match: {}
                }, {
                    $lookup: {
                        from: 'table1',
                        localField: 'target',
                        foreignField: '_id',
                        as: 'target'
                    }
                }]);
            });
            results.push({...res});
            console.log(await Table1toN.collection.dropIndexes());
            await Table1toN.remove({});

            res.testName = 'Deleta todos';
            res.time = await time(() => {
                return Table1.deleteMany({});
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
            randIndex = random[randIndex];

            res.time = await time(() => {
                return new Promise((resolve, reject) => {
                    mysql.query(scripts.select('*', 'table1', {id: randIndex.id}), (...args) => {
                        resolve(args);
                    });
                })
            });
            results.push({...res});


            res.testName = 'Join 1 - N';
            await new Promise((res) => {
                const insert = [...new Array(key)].map((item, index) => {
                    randIndex = Math.floor(Math.random() * random.length);
                    randIndex = random[randIndex];
                    return [randIndex.id, new Date()];
                });
                mysql.query(...scripts.insertMultiple('table1toN', key, ['target', 'createdAt'], insert), (...args) => res(args));
            });

            res.time = await time(() => {
                return new Promise((res) => {
                    mysql.query('SELECT * FROM table1toN JOIN table1 on target=id', (...args) => res(args));
                });
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

            await new Promise((res) => {
                mysql.query('DELETE FROM table1toN', res);
            })


            mysql.query('ALTER TABLE table1 AUTO_INCREMENT = 1');
            if (key === array[array.length - 1]) {
                write('results2.csv', results, ['database', 'testName', 'quantity', 'time']);
            }
            console.log(key);
        })
    });

    return results;
}

runTests();
