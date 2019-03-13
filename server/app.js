require('dotenv').config()

const express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    articleRoute = require('./routes/articleRoute'),
    cors = require('cors')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-s6ej4.gcp.mongodb.net/test2?retryWrites=true`, { useNewUrlParser: true })
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/articles', articleRoute)

app.listen(port, () => console.log(`listening on port ${port}`))