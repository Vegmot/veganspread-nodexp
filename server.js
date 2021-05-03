import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express()

// connect to MongoDB
connectDB()

// initiate bodyParser
app.use(express.json())

// define routes
// all working 5/3/2021 - only PATCH request has to be sent twice
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

// Listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
