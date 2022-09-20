const { Router } = require("express");
const adminController = require("../controllers/adminController");
const router = Router();

router.get("/auth", adminController.welcome);

module.exports = router;
