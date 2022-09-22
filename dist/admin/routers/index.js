"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const account_1 = __importDefault(require("./account"));
const router = (0, express_1.Router)();
router.use("/account", account_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map