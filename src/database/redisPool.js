import {default as __redisDB} from "./redisDB";
import genericPool from "generic-pool";


class redisDbPool {
    constructor(opts = {max: 10, min: 2}) {
        this.pool = genericPool.createPool({
            create: function () {
                return __redisDB();
            },
            destroy: function (client) {
                return client.quit();
            }
        }, opts);
    }

    async acquire() {
        return await this.pool.acquire();
    }
    async release(client) {
        return await this.pool.release(client);
    }
    static getGenericPool() {
        return genericPool;
    }
}

// 使用示例
// const opts = {max: 10, min: 2};
// const myPool = new redisPool(opts);
// myPool.acquire().then(function (client) {
//     // 使用客户端
//     // ...
//
//     // 将客户端返回到池中
//     myPool.release(client);
// });

export default redisDbPool;
