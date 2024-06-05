import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.join(process.cwd(),'.env')})

 export default{
        accessToken:process.env.ACCESS_TOKEN,
        nodeEnv:process.env.NODE_ENV,
        expireIn:process.env.EXPIRE_IN,
        refreshExpireIn:process.env.REFRESH_EXPIRE_IN,
}