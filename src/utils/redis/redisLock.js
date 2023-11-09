import Redlock from "redlock"
import {redisDB} from "../../index";

const redlock = () => {
    return new Redlock(
        [redisDB()],
        {
            retryCount: 0
        }
    )
};

export const redisLock = (resourceKey, ttl = 1000) => {
    return new Promise(resolve => {
        redlock().lock(`redlock:${resourceKey}`, ttl).then(r => resolve(r)).catch(() => resolve(false));
    })
}

export const redisUnlock = (redlockInstance) => {
    return new Promise(resolve => {
        redlockInstance.unlock().then(r => resolve(r)).catch(() => resolve(false))
    })
}