import express from "express";
import multer from "multer";
import user from "../controller/user";
import { initRateLimit } from "..";

const router=express.Router();
const upload = multer({ dest: 'uploads/' })
router.post("/signup",initRateLimit(10),upload.none(),user.signup);
router.post("/login",initRateLimit(20),upload.none(),user.login);
router.post("/forgotPasswordRequest",initRateLimit(10),upload.none(),user.forgotPasswordRequest);
router.post("/passwordReset",initRateLimit(10),upload.none(),user.passwordReset)
router.post('/logout',user.logout)
export default router;