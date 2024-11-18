import jwt from "jsonwebtoken";
import { Response,Request, NextFunction } from "express";
import dotenv from "dotenv"
import { userI } from "../types";
dotenv.config();

export interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}
const auth =async(req:CustomRequest,res:Response,next:NextFunction)=>{
    try{
        const token:string = req.cookies?.token || req.body.token || req.query.token;
        console.log("this is coming from cokkies",req.cookies?.token)

        if(!token || token == undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token , process.env.JWT_SECRET as string);
            // console.log("user payload",payload);
            req.user = payload as string;
            next();
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
                error:error
            });
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error,
        });
    }
}

//signIn email checks
 const signInEmailVerify=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userEmail=req.body.email;
        
        if (userEmail && userEmail.toLowerCase().endsWith('@gmail.com')) {
           
                next();
          } else {
            
            res.status(400).json({
                message:"Enter a valid email",
                success:false,

                });
          }

    }catch(error){
        res.status(500).json({
            message:"this email did not exist",
            success:false,
            message2:"user did not created try with valid email",
            err:error
        })
    }
}

//verify password
const verifyPassword=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userPass=req.body.password;
        if (
            userPass.length >= 8 &&
            /[A-Z]/.test(userPass) &&
            /[a-z]/.test(userPass) &&
            /\d/.test(userPass) &&
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(userPass)
          ) {
            next();
          } else {
            res.status(500).json({
                message:"password did not contain all 8 characters including capital,small,numercial,special characters",
                success:false,
            })
          }
    }
    catch(error){
        res.status(500).json({
            message:"password did not contain all 8 characters",
            success:false,
            err:error
        })
    }
}

//verify are admin or not

const verifyAdmin=async(req:CustomRequest,res:Response,next:NextFunction)=>{
    try{
        const userRole=req.user as userI;
        if(userRole.role!='admin'){
            return res.status(403).json({
                message:"you can not access this route",
                success:false,
            })
        }
        next();

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error while verify role",
            success:false,
            error:error,
        })
    }
}

// exports.pdfToText=async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const pdfFile=req.files as any
//         console.log(pdfFile)
//         const readfile = fs.readFileSync(pdfFile.path, {encoding:"utf-8"}); 
//     console.log(readfile)
//     next();
//     res.send(readfile)
//     }catch(err){
//         console.log("something went wrong",err)
//         res.send("something went wrong")
//     }
// }

export default {signInEmailVerify,verifyPassword,auth,verifyAdmin}