"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = __importDefault(require("util"));
const database_1 = __importDefault(require("../../global/database"));
const db = database_1.default;
dotenv_1.default.config();
const query = util_1.default.promisify(db.query).bind(db);
exports.welcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Welcome to travel buddy:::stay tuned");
        return;
    }
    catch (error) {
        res.status(400).send({
            message: "error fetching data",
            statusCode: 400,
        });
        return;
    }
});
//# sourceMappingURL=Profiles.js.map