"use strict";
const express_1 = require("express");
const Profiles_1 = require("../controllers/Profiles");
const router = (0, express_1.Router)();
router.get("/auth", Profiles_1.welcome);
module.exports = router;
//# sourceMappingURL=profile.js.map