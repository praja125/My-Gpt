import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './Routes/userRoutes.js'
import chatRouter from './Routes/chatRoutes.js'
import messageRouter from './Routes/messageRoutes.js'
import creditRouter from './Routes/creditRoutes.js'

const app = express()

await connectDB()

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res)=> res.send('server is Live!'))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

const PORT = process.env.PORD || 3000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})