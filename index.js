const {configDotenv} = require("dotenv");
configDotenv(".env")
const {redisUtils} = require("./database");

const x =async () => {
  let a = await redisUtils.redisLock(555)
  console.log(a)
  setTimeout(async ()=>{
    let b = await redisUtils.redisUnlock(a)
    console.log(b)
  },2000)
}

x()