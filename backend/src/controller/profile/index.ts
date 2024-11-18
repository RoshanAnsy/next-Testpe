import { CustomRequest } from "../../middleware/auth"
import { Response } from "express"
import { userI } from "../../types";
import { prisma } from "../..";
import  { UploadSingleFile } from "../../utils/fileUpload";



const GetUserDetails=async(req:CustomRequest,res:Response)=>{
    try{
        const user=req.user as userI;
         const userId=Number(user.id)
         const result=await prisma.user.findFirst({
            where:{id:userId},
            select:{
                id:true,name:true,email:true,
            }
         })
         res.status(200).json({
            message:"user details found successfully",
            success:true,
            result,
         })
    }
    catch(error){
        res.status(500).json({
            message:"error while fetching user information",
            success:false,
            error:error,
        })
    }
}

const UploadProfilePhoto=async(req:CustomRequest,res:Response)=>{
    try{
        const user=req.user as userI;
         const userId=Number(user.id)
         const photo=req.file;

         if(!photo){
            return res.status(404).json({
                message:"no photo uploaded",
                success:false,
            })
         }
         const Image =await UploadSingleFile(photo);

         await prisma.user.update({
             where:{id:userId},
             data:{image:Image as string},
         })
         res.status(200).json({
            message:"user profile photo updated successfully",
            success:true,
         })
    }
    catch(error){
        res.status(500).json({
            message:"error while updating user profile photo",
            success:false,
            error:error,
        })
    }
 }


const GetAllVerifiedUploadsPepper=async(req:CustomRequest,res:Response)=>{
    try{
        const user=req.user as userI;
         const userId=Number(user.id)
         const result=await prisma.question.findMany({
            where:{userId:userId,verify:true},
            select:{
                id:true,year:true,heading:true,description:true,thumbnail:true,
            }
         })
         res.status(200).json({
            message:"user verified uploads found successfully",
            success:true,
            result,
            TotalVerifiedPepper:result?.length,
         })

    }
    catch(error){
        res.status(500).json({
            message:"error while fetching user upload pepper",
            success:false,
            error:error,
        })
    }

}

export  {GetUserDetails,GetAllVerifiedUploadsPepper,UploadProfilePhoto};