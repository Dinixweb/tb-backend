"use strict";
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.get("/auth", adminController_1.welcome);
module.exports = router;
//# sourceMappingURL=account.js.map