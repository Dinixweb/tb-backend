const { Router } = require("express");
const profileController = require("../controllers/Profiles");

const router = Router();

router.get("/auth", profileController.welcome);

module.exports = router;
