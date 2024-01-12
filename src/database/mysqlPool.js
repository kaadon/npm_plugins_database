const mysql = require('mysql');
const {databaseConfig} = require("../config/databaseConfig");

class mysqlPool {
    constructor(config) {
        this.pool = mysql.createPool(databaseConfig());
    }
    mysqlQuery(sql, args) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(new Error(err?.sqlMessage || err?.message));
                }
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.pool.end(err => {
                if (err) {
                    return reject(new Error(err?.sqlMessage || err?.message));
                }
                resolve();
            });
        });
    }
}

// 使用示例
// const config = {
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'test'
// };
// const myPool = new MySQLPool(config);
//
// myPool.query('SELECT * FROM `table`').then(rows => {
//     // 处理结果
//     // ...
//
//     // 关闭连接池
//     myPool.close();
// });

export default mysqlPool;