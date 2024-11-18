"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const questionsValidation_1 = __importDefault(require("../component/questionsValidation"));
const openAi_1 = __importDefault(require("../ai/openAi"));
const listData_1 = __importDefault(require("../component/listData"));
const prev_questions_pepper_1 = __importDefault(require("../controller/prev.questions.pepper"));
const auth_1 = __importDefault(require("../middleware/auth"));
const solution_pepper_1 = __importDefault(require("../controller/solution.pepper"));
const route = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
route.post("/questionsValidate", questionsValidation_1.default.ValidateAnswer);
route.post("/openai", openAi_1.default.OpenAi);
route.get("/list/test", listData_1.default);
route.post("/", prev_questions_pepper_1.default.getAllPepper);
route.get("/viewpepper", prev_questions_pepper_1.default.viewPepper);
route.get('/getPSolution', solution_pepper_1.default.getPepperSolution);
route.post("/solutions", auth_1.default.auth, solution_pepper_1.default.createSolution);
route.post("/prev", upload.fields([{ name: 'files', maxCount: 10 }, { name: 'file', maxCount: 1 }]), // Allow both 'files' and 'file' fields
auth_1.default.auth, (req, res, next) => {
    var _a;
    // Check for both 'files' and 'file'
    if (!req.file && ((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        return res.status(400).json({ error: "No files uploaded." });
    }
    else
        next();
}, prev_questions_pepper_1.default.addPrevYearPepper);
// 
exports.default = route;
