const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers['access_token']
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).json({ message: `Not authenticated user` })
        }
        else {
            next()
        }
    })
}