const userModel = require('../models/user')
const bcryptjs = require('../helpers/bcrypt')
const jwtSign = require('../helpers/jsonSign')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class Controller {
    static findAll(req, res) {
        userModel
            .find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signIn(req, res) {
        userModel
            .findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json({ message: `wrong username/password` })
                } else {
                    if (bcryptjs.compare(req.body.password, user.password) == false) {
                        res.status(401).json({ message: `wrong username/password` })
                    }
                    else {
                        const payload = {
                            email: user.email
                        }
                        let fullName = `${user.first_name} ${user.last_name}`
                        let token = jwtSign(payload)
                        res.status(200).json({ token, userId: user._id, name: fullName })
                    }
                }
            })
    }

    static signUp(req, res) {
        userModel
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcryptjs.hash(req.body.password)
            })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static signInGoogle(req, res) {
        let userLoggedIn = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(respone => {
                userLoggedIn = respone.payload
                return userModel.findOne({ email: userLoggedIn.email })
            })
            .then(user => {
                if (user) {
                    res.status(200).json({
                        userId: user._id,
                        message: 'User successfully logged in',
                        token: jwtSign({ email: user.email }),
                        data: userLoggedIn
                    })
                } else {
                    return userModel.create({
                        first_name: userLoggedIn.given_name,
                        last_name: userLoggedIn.family_name,
                        password: 'google',
                    })
                        .then(newUser => {
                            res.status(201).json({
                                id: newUser._id,
                                message: 'New user created',
                                token: jwtSign({ email: userLoggedIn.email }),
                                data: userLoggedIn
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}

module.exports = Controller