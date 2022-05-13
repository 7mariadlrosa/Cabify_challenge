const router = require("express").Router()

router.use("/eaters", require('./eaters.routes'))
router.use("/restaurants", require('./restaurants.routes'))
router.use("/createGroups", require('./createGroups.routes'))

module.exports = router;