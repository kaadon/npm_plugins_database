const {configDotenv} = require("dotenv");
configDotenv(".env")
const {redisLock} = require("./database/utils/redis/redisLock");

const x =async () => {
  let lock = await redisLock("2122222653",100)
  if (lock) {
    console.log(lock)
    setTimeout(() => {
      console.log(5555)
      lock.unlock().catch(console.log)
    }, 1000)
  }
}

x()