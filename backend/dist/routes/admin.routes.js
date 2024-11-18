"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prev_questions_pepper_1 = __importDefault(require("../controller/prev.questions.pepper"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.put("/pepperVerify", upload.none(), auth_1.default.auth, auth_1.default.verifyAdmin, prev_questions_pepper_1.default.verifyPepper);
router.get("/unverifiedPepper", upload.none(), auth_1.default.auth, auth_1.default.verifyAdmin, prev_questions_pepper_1.default.getUnverifiedPepper);
exports.default = router;
