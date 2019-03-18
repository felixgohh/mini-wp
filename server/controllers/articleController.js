const articleModel = require('../models/article')

class Controller {
    static findAll(req, res) {
        let condition = {}
        if (req.query.search) {
            condition = {
                user_id: req.query.search
            }
        }

        articleModel
            .find(condition)
            .sort([
                ['created_at', -1]
            ])
            .populate('user_id')
            .then(response => {
                // console.log(response);
                
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
        console.log(req.body,'<<<<<<<<<<<<');
        
        let objCreate = {
            link: req.file.cloudStoragePublicUrl,
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.userId,
            created_at: new Date
        }
        articleModel
            .create(objCreate)
            .then(response => {
                console.log(response);
                
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let objUpdate = {}
        if (req.file !== undefined) {
            objUpdate = {
                link: req.file.cloudStoragePublicUrl,
                title: req.body.title,
                content: req.body.content
            }
        } else {
            objUpdate = {
                title: req.body.title,
                content: req.body.content
            }
        }
        articleModel
            .findByIdAndUpdate(req.params.id, objUpdate, { new: true })
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