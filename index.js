const {configDotenv} = require("dotenv");
configDotenv(".env")
const {redisUtils} = require("./database");

const x =async () => {
  console.log(redisUtils.redisLock(555))
}

x()