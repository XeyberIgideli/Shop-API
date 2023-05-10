import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Routes
import productsRoute from './routes/productsRoute.js'

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Products route
app.get('/', (req,res) => {
    res.send('<a href="/api/v1/products">Products</a>')
})

app.use('/api/v1/products', productsRoute)

app.listen(5000)