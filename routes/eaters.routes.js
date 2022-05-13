const express = require('express');
const router = express.Router();
const Eater = require('../models/Eater.model');

//EATERS LIST
router.get('/', (req, res) => {

    Eater
        .find()
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

//CREATE EATERS
router.post('/create', (req, res) => {
    const { email, name } = req.body

    Eater
        .create({ email, name })
        .then(() => res.json('201 Created'))
        .catch(err => res.status(500).json(err))
})

//DELETE EATERS
router.delete('/', (req, res) => {

    const promises = [Eater.remove(), Restaurant.remove()]

    Promises
        .all(promises)
        .then(() => res.status(200).json("Eaters and restaurants deleted."))
        .catch(err => res.status(500).json(err))
})

module.exports = router;