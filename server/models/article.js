const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: String,
    content: String,
    link: String,
    created_at: Date,
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article