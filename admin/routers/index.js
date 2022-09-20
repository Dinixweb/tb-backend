const { Router } = require("express");

const router = Router();

router.use("/account", require("./account"));

module.exports = router;
