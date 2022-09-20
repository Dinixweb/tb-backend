const { Router } = require("express");

const router = Router();

router.use("/clients", require("../client/routers"));

module.exports = router;
