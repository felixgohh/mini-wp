const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
})

UserSchema.pre('save', function (next) {
    User
        .findOne({ email: this.email })
        .then(data => {
            if (data) {
                throw new Error('email already exist')
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })

})

const User = mongoose.model('User', UserSchema)

module.exports = User