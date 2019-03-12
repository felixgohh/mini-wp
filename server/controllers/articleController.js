const articleModel = require('../models/article')

class Controller {
    static findAll(req, res) {
        articleModel
            .find({})
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res) {
        articleModel
            .findById(req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        articleModel
            .create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date
            })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        articleModel
            .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        articleModel
            .findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller