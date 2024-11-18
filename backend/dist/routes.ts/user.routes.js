"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_1 = __importDefault(require("../controller/user"));
const questionsValidation_1 = __importDefault(require("../component/questionsValidation"));
const openAi_1 = __importDefault(require("../ai/openAi"));
const listData_1 = __importDefault(require("../component/listData"));
const prev_questions_pepper_1 = __importDefault(require("../controller/prev.questions.pepper"));
const auth_1 = __importDefault(require("../middleware/auth"));
const __1 = require("..");
const route = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
route.post("/signup", (0, __1.init)(20), upload.none(), user_1.default.signup);
route.post("/login", (0, __1.init)(20), upload.none(), user_1.default.login);
route.post("/forgotPasswordRequest", (0, __1.init)(10), upload.none(), user_1.default.forgotPasswordRequest);
route.post("passwordReset", (0, __1.init)(10), upload.none(), user_1.default.passwordReset);
route.post("/questionsValidate", questionsValidation_1.default.ValidateAnswer);
route.post("/openai", openAi_1.default.OpenAi);
route.get("/list/test", listData_1.default);
route.post("/", prev_questions_pepper_1.default.getAllPepper);
route.get("/viewpepper", prev_questions_pepper_1.default.viewPepper);
route.post("/prev", upload.array('files', 10), auth_1.default.auth, (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded." });
    }
    next();
}, prev_questions_pepper_1.default.addPrevYearPepper);
exports.default = route;
