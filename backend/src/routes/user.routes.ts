import  express from "express";
import multer from "multer";
import questionsValidation from "../component/questionsValidation";
import openAi from "../ai/openAi";
import ListData from "../component/listData";
import pepper from "../controller/prev.questions.pepper";
import { Request, Response, NextFunction } from 'express';
import auth from "../middleware/auth";

import Solution from "../controller/solution.pepper"
const route=express.Router();
const upload = multer({ dest: 'uploads/' })
route.post("/questionsValidate",questionsValidation.ValidateAnswer);
route.post("/openai",openAi.OpenAi)
route.get("/list/test",ListData)
route.post("/",pepper.getAllPepper)
route.get("/viewpepper",pepper.viewPepper)
route.get('/getPSolution',Solution.getPepperSolution);
route.post("/solutions",auth.auth ,Solution.createSolution);


route.post(
  "/prev",
  
  upload.fields([{ name: 'files', maxCount: 10 }, { name: 'file', maxCount: 1 }]),// Allow both 'files' and 'file' fields
  auth.auth,
  (req: Request, res: Response, next: NextFunction) => {
    // Check for both 'files' and 'file'
    if (!req.file && req.files?.length==0) {
      return res.status(400).json({ error: "No files uploaded." });
    }
    else next();
  },
  pepper.addPrevYearPepper
);

    
// 
export default route;