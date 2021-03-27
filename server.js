import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import feedRoutes from './routes/feedRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

const app = express()

// connect to MongoDB
connectDB()

// initiate bodyParser
app.use(express.json())

// define routes
app.use('/api/users', userRoutes)
app.use('/api/feeds', feedRoutes)
app.use('/api/profiles', profileRoutes)

// Listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
