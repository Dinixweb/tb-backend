"use strict";
const express_1 = require("express");
const Users_1 = require("../controllers/Users");
const router = (0, express_1.Router)();
router.get("/users", Users_1.CreateUsers);
module.exports = router;
//# sourceMappingURL=users.js.map