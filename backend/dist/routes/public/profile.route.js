"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../../controller/profile");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/profile', auth_1.default.auth, profile_1.GetUserDetails);
router.get('/verifyPepper', auth_1.default.auth, profile_1.GetAllVerifiedUploadsPepper);
router.post('/uploadPhoto', upload.single('file'), auth_1.default.auth, profile_1.UploadProfilePhoto);
exports.default = router;
