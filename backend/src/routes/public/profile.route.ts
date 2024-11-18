import express from 'express';
import {GetUserDetails,GetAllVerifiedUploadsPepper, UploadProfilePhoto} from "../../controller/profile"
import auth from "../../middleware/auth";
import multer from 'multer';
const router=express.Router();
const upload = multer({ dest: 'uploads/' })
router.get('/profile',auth.auth,GetUserDetails);
router.get('/verifyPepper',auth.auth,GetAllVerifiedUploadsPepper)
router.post('/uploadPhoto',upload.single('file'),auth.auth,UploadProfilePhoto)

export default router;