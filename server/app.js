const express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    articleRoute = require('./routes/articleRoute'),
    cors = require('cors')

mongoose.connect('mongodb://localhost/miniwp', { useNewUrlParser: true })
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/articles', articleRoute)

app.listen(port, () => console.log(`listening on port ${port}`))