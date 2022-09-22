"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Profiles_1 = __importDefault(require("../controllers/Profiles"));
const router = (0, express_1.Router)();
router.get("/auth", Profiles_1.default.welcome);
module.exports = router;
//# sourceMappingURL=profile.js.map