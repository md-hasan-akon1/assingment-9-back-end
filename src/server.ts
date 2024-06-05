import { Server } from "http"
import app, { port } from "./app"


const main=()=>{
 const server:Server = app.listen(port, () => {
    console.log(`Blood server is running ${port}`)
  })
}

main()