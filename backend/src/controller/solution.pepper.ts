import { Response } from "express";
import { prisma } from "..";
import { CustomRequest } from "../middleware/auth";
import { userI } from "../types";

const createSolution = async (req: CustomRequest, res: Response) => {
  try {
    const { questionId, blocks } = req.body;
    // Clearer names for input fields
    const authenticatedUser = req.user as userI;
    const profileId = Number(authenticatedUser.profileId);
    console.log("solution",authenticatedUser,profileId);

    // Validate required fields
    if (!questionId || !profileId || !blocks || !blocks.length) {
        return res.status(400).json({ error: 'Missing required fields' });
    }  
    console.log("this is  a solution data",blocks)
    // Create the solution with nested blocks
    const solution = await prisma.solution.create({
        data: {
          questionId,
          profileId,
          blocks: {
            create: blocks.map((block:any, index:any) => ({
              type: block.type,
              content: block.content,
              level: block.level || null,
              parentBlockId: block.parentBlockId || null,
              order: block.order || index,
              styles: block.styles || null,
              altText: block.altText || null,
            })),
          },
        },
      });


    // Update the question to indicate a solution exists
    await prisma.question.update({
        where: { id: questionId },
        data: { solutionsExist: true },
      });

    if (!solution) {
      res.status(400).json({
        message: "Failed to create solution",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Solution created successfully",
      success: true,
      solution,
    });
  } catch (error) {
    console.error("Error creating solution:", error);
    res.status(500).json({
      message: "Internal server error while creating solution",
      success: false,
    });
  }
};


const getPepperSolution=async(req:CustomRequest,res:Response)=>{
    try{
        const solutionId =Number(req.params.solutionId);
        if(!solutionId){
            res.status(400).json({
                message:"solutionId is missing",
                success:false,
            })
            return;
        }
        //get solution with question and profile details
        const solution=await prisma.solution.findUnique({
            where:{id:solutionId},
            select:{createdAt:true,
                    profile:true,
                    updatedAt:true,
                    blocks:true,
                    
            }
        });
        if(!solution){
            res.status(404).json({
                message:"solution not found",
                success:false,
            })
        }
        res.status(200).json({
            message:"solution found",
            success:true,
            solution,
        })
    }catch(error){
        console.error("error fetching solution:",error);
        res.status(500).json({
            message:"internal server error while fetching solution",
            success:false,
        })
    }
}
export default { createSolution,getPepperSolution };
