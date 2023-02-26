import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
// import schoolRoutes from './routes/schoolRoutes.js'
// import teacherRoutes from './routes/teacherRoutes.js'
// import studentRoutes from './routes/studentRoutes.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
// app.use("/api/school", schoolRoutes)
// app.use("/api/teacher", teacherRoutes)
// app.use("/api/student", studentRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})