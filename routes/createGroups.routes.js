const express = require('express');
const router = express.Router();
const Eater = require('../models/Eater.model');
const Restaurant = require('../models/Restaurant.model');
const Group = require('../models/Group.model');

//GROUPS LIST
router.get('/', (req, res) => {

    Group
        .find()
        .then((response) => res.json(response))
        .catch(() => res.status(500).json("Groups aviables"))
})

//CREATE GROUPS
router.post('/create', (req, res) => {

    Group
        .find()
        .then(response => {
            if (response.length) {
                res.status(500).json("Groups already created")
            } else {

                Eater
                    .find()
                    .then(response => {

                        Restaurant
                            .find()
                            .then(restaurants => {

                                const numGroups = Math.ceil(response.length / 7)
                                const groupsMin = Math.floor(response.length / numGroups)
                                let remainingExtraPerson = (response.length % numGroups)

                                let eatersForGroup = []
                                const createGroup = []

                                response.forEach(eater => {
                                    eatersForGroup.push(eater)
                                    if (eatersForGroup.length === groupsMin && remainingExtraPerson === 0) { //Este supuesto es para cuando no hay resto.
                                        createGroup.push({
                                            leader: eatersForGroup[0],
                                            eaters: eatersForGroup,
                                            restaurant: restaurants[createGroup.length] //Pusheamos el restaurante, el primero de la BBDD para el primer grupo y así sucesivamente.
                                        })
                                        eatersForGroup = []
                                    }
                                    else if (eatersForGroup.length === groupsMin + 1 && remainingExtraPerson > 0) { //Este supuesto es para cuando hay resto.
                                        createGroup.push({
                                            leader: eatersForGroup[0],  //Pusheamos el leader de la lista de comensales, en este caso siempre será el primero que se pushee a cada grupo.
                                            eaters: eatersForGroup,
                                            restaurant: ""
                                        })
                                        eatersForGroup = []  //Array vacío al que le pusheamos los comensales.
                                        --remainingExtraPerson
                                    }
                                })

                                Group                        //Crear el grupo.
                                    .create(createGroup)
                                    .then((groups) => res.json(groups))
                                    .catch(() => res.status(500).json("Group not created yet"))
                            })
                    })
            }
        })
})

module.exports = router;