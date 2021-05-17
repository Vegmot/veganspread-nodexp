import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

// connect to MongoDB
connectDB()

// initiate bodyParser
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// define routes
// all working 5/3/2021 - only PATCH request has to be sent twice
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/upload', uploadRoutes)

// making uploads & build folder static - accessible
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/front/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// handling not found and custom error
app.use(notFound)
app.use(errorHandler)

// Listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
