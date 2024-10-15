"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import axios from "axios";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
type Inputs = {
  email: string;
};

export default function ForGatePassword() {
  const router=useRouter();
//   const {toast}=useToast();
  const[isLoading,setIsLoading]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>();
 
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setIsLoading(true);
    const result=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPasswordRequest`,data);
    console.log("user data",result.data.user.id)
    localStorage.setItem("userId",result?.data.user.id);
    setIsLoading(false);
    reset();
     if (result) router.push("/auth/changepassword");

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            Welcome to <span className="text-blue-500">TESTPE</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          
          {/* Sign-in form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="example" className="block text-sm text-gray-700">
              Email
              </label>
              <input
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                {...register("email")}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 rounded-md cursor-pointer"
              value="Submit"
            > {isLoading? "Loading...":"Reset Password"}</Button>
          </form>
         
        </CardContent>
      </Card>
    </div>
  );
}
