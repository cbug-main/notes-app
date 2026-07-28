import express from 'express'
import db from '../database/db.js'
import authRoutes from '../routes/authRoutes.js'
import notesRoutes from '../routes/notesRoutes.js'

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`You've reached the main page`)
})

app.use('/auth', authRoutes)
app.use('/notes', notesRoutes)

app.listen(PORT, (req, res) => {
    console.log(`the server is running on port: ${PORT}`)
})