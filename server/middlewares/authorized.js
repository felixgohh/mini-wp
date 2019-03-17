const articleModel = require('../models/article')

module.exports = (req, res, next) => {
    let userId = req.headers.authorized
    let articleId = req.headers.articleid

    articleModel
        .findById(articleId)
        .then(article => {
            if (article.user_id == userId) {
                next()
            } else {
                throw new Error('Not authorized to complete action')
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })

}