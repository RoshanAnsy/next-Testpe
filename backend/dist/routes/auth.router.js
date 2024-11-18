"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_1 = __importDefault(require("../controller/user"));
const __1 = require("..");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post("/signup", (0, __1.initRateLimit)(10), upload.none(), user_1.default.signup);
router.post("/login", (0, __1.initRateLimit)(20), upload.none(), user_1.default.login);
router.post("/forgotPasswordRequest", (0, __1.initRateLimit)(10), upload.none(), user_1.default.forgotPasswordRequest);
router.post("/passwordReset", (0, __1.initRateLimit)(10), upload.none(), user_1.default.passwordReset);
router.post('/logout', user_1.default.logout);
exports.default = router;
