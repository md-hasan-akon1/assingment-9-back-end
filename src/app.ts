import express from 'express'
import cors from "cors"
import { router } from './app/routers'
import globalErrorHandler from './middleWare/globalErrorHandler'
import { apiNotFound } from './app/error/apiNotFound'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
export const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api",router)

app.use(globalErrorHandler)
app.use(apiNotFound)
export default app