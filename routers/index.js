const { Router } = require("express");

const router = Router();

// Client router path
router.use("/clients", require("../client/routers"));

// Admin router path
router.use("/clients", require("../client/routers"));

module.exports = router;
