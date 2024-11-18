import express from "express"
import prevQuestionsPepper from "../controller/prev.questions.pepper";
import multer from "multer";
import auth from "../middleware/auth";

const router=express.Router();
const upload = multer({ dest: 'uploads/' })
router.put("/pepperVerify",upload.none(),auth.auth,auth.verifyAdmin,prevQuestionsPepper.verifyPepper);
router.get("/unverifiedPepper",upload.none(),auth.auth,auth.verifyAdmin,prevQuestionsPepper.getUnverifiedPepper);
export default router;