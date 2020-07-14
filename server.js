require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect(String(process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.connection.once('open', () => console.log('Database connected'))

app.use('/users', require('./Routes/Users'))
app.use('/auth', require('./Routes/Auth'))

PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
