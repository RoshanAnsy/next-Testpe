"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const user_1 = __importDefault(require("../controller/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
route.post("/signup", user_1.default.signup);
route.post("/login", auth_1.default.auth, user_1.default.login);
exports.default = route;
