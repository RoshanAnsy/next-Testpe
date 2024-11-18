import { Request,Response } from "express"
import fileUpload from "../utils/fileUpload";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import ApiError from "../utils/apiErrors";
import { CustomRequest } from "../middleware/auth";
import { userI } from "../types";
import { UploadSingleFile } from "../utils/fileUpload";


//entry a pepper 
const addPrevYearPepper = async (req: CustomRequest, res: Response) => {
  try {
 
    const { subject, year, semester, branch, bord, heading,description } = req.body;
    // console.log("this coming data,",bord as string)
    const user=req.user as userI;
    const Id=Number(user.id)
    const filesField = req.files as { [fieldname: string]: Express.Multer.File[] };
    const files = filesField?.['files']; 
    const file = filesField?.['file'] ? filesField['file'][0] : undefined;
    if (file==null || file==undefined && (!files || files.length === 0)) {
      return res.status(400).json({ error: "No files uploaded." });
    }
    // Assuming you're using multer to handle multiple file uploads
    // const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    // const files = req.files?.['files'] as Express.Multer.File[];
    // const file: Express.Multer.File | undefined = req.file;
    // Upload files and get an array of URLs
    const imageUrls: (string | ApiError)[] = await fileUpload(files);
       // Ensure fileUpload returns string[]

    // Check for errors in the uploaded files (assuming the function may throw)
    if (!imageUrls || imageUrls.length === 0) {
      return res.status(400).send("Error in file upload or no files uploaded");
    }

    const thumbnailUrl: string | ApiError = await UploadSingleFile(file);
    if (thumbnailUrl instanceof ApiError) {
      return res.status(400).json({ error: "Error uploading thumbnail" });
    }

    // Insert the question data along with the array of URLs into the database
    const result = await prisma.question.create({
      data: {
        subject,
        year,
        semester,
        branch,
        bord,
        images: imageUrls as string[],  // Directly pass the array of image URLs
        heading,
        description,
        thumbnail:thumbnailUrl as string,
        userId:Id ,
        verify:false,
      } 
    });

    // Return the created result back to the client
    return res.status(200).json(result);

  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ error: "An error occurred on the server" });
  }
};






interface filterType {
    bord?: string;
    year?: string;
    semester?: string;
    subject?: Prisma.StringFilter;
  }
  
  const getAllPepper = async (req: Request, res: Response) => {
    try {
      const { bord, year, semester, subject } = req.body;
    
      if (!subject) {
        return res.status(400).json({ error: "Subject is required" });
      }
  
      const filter: filterType = { subject: { contains: subject as string, mode: 'insensitive' } };

      if (bord) filter.bord = bord as string;
      if (year) filter.year = year as string;
      if (semester) filter.semester = semester as string;
   
      const result = await prisma.question.findMany({
        where: {...filter,verify:true},
        select:{
            year:true,heading:true,description:true,id:true,thumbnail:true,
        }
      });
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  };


  //get the image of pepper and all detail by Id
  const viewPepper = async (req: Request, res: Response) => {
    try {
      const pepperId = Number(req.query.pepperId);
      if (isNaN(pepperId)) {
        return res.status(400).json({ error: "Invalid pepper ID" });
      }
 
      const result = await prisma.question.findUnique({
        where: { id: pepperId,verify:true },
        select:{
            bord:true,branch:true,
            year:true,semester:true,
            subject:true,images:true
        }
      });
  
      if (!result) {
        return res.status(404).json({ error: "Pepper not found" });
      }
  
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  };
  
  //get the unverified pepper
  const getUnverifiedPepper=async(req:Request,res:Response)=>{
        try{
          const page = parseInt(req.query.page as string) || 1; 
          const limit = parseInt(req.query.limit as string) || 10; 
          const skip = (page - 1) * limit; 
          const result = await prisma.question.findMany({
            where: { verify: false }, 
            skip: skip, 
            take: limit, 
          });
          res.status(200).json({
            message:"successfully retrieved the unverified pepper",
            success:true,
            result,
          })
        }
        catch(error){
          console.log(error)
          res.status(500).json({
            message:"error while fetching the unverified pepper",
            success:false,
            error:error,
          })
        }
  }
  //pepper verify by admin
  const verifyPepper=async(req:Request,res:Response)=>{
        
        try{
          const pepperId:number=Number(req.query.pepperId);
          const status:boolean=Boolean(req.body.status);
          if(!pepperId || !status){
            res.status(400).json({
              message:"pepperId is missing",
              success:false,
            })
          }
          if(status){
            await prisma.question.update({
              where:{id:pepperId},
              data:{verify:status}
            })
          }
          else{
            await prisma.question.delete({
              where:{id:pepperId}
            })
          }

          res.status(200).json({
            message:`${status? "pepper verify successfully" :"pepper delete successfully"}`,
            success:true,
          })
        }
        catch(error){
          console.log(error);
          res.status(500).json({
            message:"server error while verifying the pepper ",
            success:false,
            error:error,
          })
        }
  }

export default {addPrevYearPepper,getAllPepper,viewPepper,verifyPepper,getUnverifiedPepper};