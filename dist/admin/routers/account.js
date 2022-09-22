"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const router = (0, express_1.Router)();
router.get("/auth", adminController_1.default.welcome);
module.exports = router;
//# sourceMappingURL=account.js.map