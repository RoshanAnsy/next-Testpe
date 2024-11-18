import { Request, Response } from "express";
import bcrypt from "bcrypt"; // Assuming bcrypt is imported correctly
import { prisma } from ".."; // Assuming prisma instance is correctly imported
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import {CustomRequest} from "../types/index"



export const signup = async (req: CustomRequest, res: Response) => {
  try {
    // Destructure request body with types
    const { email, name, role, password, conformPassword } = req.body;

    // Validate required fields
    if (!email || !password || !conformPassword) {
      return res.status(400).send("All fields are required");
    }

    // Validate if passwords match
    if (password !== conformPassword) {
      return res.status(400).send("Password and confirm password do not match");
    }

    // Set default values for role and name
    // If role is empty, set to 'user'
    const userName: string = name ? `${name}`: email.split('@')[0]; // If name is empty, use email's prefix before '@'

    // Check if user already exists
    const isExit = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        name: true,
      },
    });

    if (isExit) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Secure password (hashing)
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "server Error at hashing password",
        error: err,
      });
    }

    // Create a new user
    await prisma.user.create({
      data: {
        email,
        name: userName, // Use the default or provided name
        role, // Use the default or provided role
        password: hashedPassword,
        profile:{
            create:{}
        }
      } 
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: " internal server error",
      error: error,
    });
  }
};

  

//login

 const login =async(req:Request,res:Response)=>{
    
    try {
        const {email,password}:{email:string | undefined,password:string | undefined} = req.body;

        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        const user = await prisma.user.findFirst({
            where: {
                email: email
              },
              select: {
                email: true,
                id:true,
                password:true,
                role:true,
                name:true,
                image:true,
                profile:{
                   select:{
                    id:true,
                   }
                },
              },
            
        });

        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user.id,
            role:user.role,
            name:user.name,
            image:user.image,
            profileId:user.profile?.id
            
           
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            const token =  jwt.sign(payload, 
                                process.env.JWT_SECRET as string,
                                {
                                    expiresIn:"2h",
                                });
            if(!token){
                return res.status(400).json({
                    message:"something went wrong while login",
                    
                })
            }
                                
            
            // user.password = undefined;
            const options:CookieOptions=  {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
                path:"/",
                secure: process.env.NODE_ENV === 'production',
                sameSite:"lax",
                priority:"medium",
            }

            res.cookie("token", token, options)

           return res.status(200).json({
                success:true,
                payload,
                message:'User Logged in successfully',
            });

            
        }
        else {
            //password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'internal server Failure',
            err:error
        });

    }

} 


const forgotPasswordRequest=async(req:Request,res:Response)=>{
    
    try{
        const {email}:{email:string}=req.body;

        if(!email){
            return res.status(401).json({
                message:"inter the email",
                success:false,
            })
        }
        const user=await prisma.user.findFirst({
                where:{email:email as string},
                select:{
                    id:true
                }
        });
        if(!user){
            return res.status(401).json({
                message:"user not registered",
                success:false,
            })
        }

        return res.status(200).json({
            message:"user registered successfully",
            success:true,
            user,
        })

    }
    catch(error){
        res.status(500).json({
            message:"internal server error",
            success:false,
            error:error,
        })
    }
}


//reset password
const passwordReset=async(req:Request,res:Response)=>{
    try{
        const {password,conformPassword,userId}:{password:string | undefined, conformPassword:string | undefined,userId:string | undefined}=req.body;
        if(password===undefined || conformPassword===undefined){
            return res.status(401).json({
                message:"password and conform password are required ",
                success:false,
            })
        }
        if(password!==conformPassword){
            return res.status(401).json({
                message:"password and conform password does not matched",
                success:false,
            })
        }
         //secure password
         let hashedPassword;
         try{
             hashedPassword = await bcrypt.hash(password as string, 10);
         }
         catch(err) {
             return res.status(500).json({
                 success:false,
                 message:'Error in hashing Password',
                 error:err,
             });
         }
         
        await prisma.user.update({
            where:{id:parseInt(userId as string)},
            data:{password:hashedPassword}
            
        },
       
    )
        res.status(200).json({
            message:"password has successfully been updated",
            success:true
        })
    }
    catch(error){
        res.status(500).json({
            message:"server error while updating password",
            success:false,
            error:error
        })
    }
}

//logout
const logout=async (req:Request, res:Response) => {
    try{
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error while logging out",
            error: error,
        });
    }
}

export default {signup,login,passwordReset,forgotPasswordRequest,logout};