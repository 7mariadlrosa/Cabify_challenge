const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant.model');

//RESTAURANTS LIST
router.get('/', (req, res) => {

    Restaurant
        .find()
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

//CREATE RESTAURANTS 
router.post('/create', (req, res) => {
    const { name, adress } = req.body

    Restaurant
        .create({ name, adress })
        .then(() => res.json('201 Created'))
        .catch(err => res.status(500).json(err))
})

module.exports = router;