const { Router } = require("express");
const profileController = require("../controllers/Profiles");

const router = Router();

router.get("/profiles", profileController.welcome);

module.exports = router;
