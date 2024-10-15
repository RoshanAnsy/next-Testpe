"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Inputs = {
  password: string;
  conformPassword:string;
  userId:number
};

export default function ChangePassword() {
  const [isLoading,setIsLoading]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const router=useRouter();
  
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setIsLoading(true);
    const id=localStorage.getItem("userId");
    data.userId=Number(id);
    const result=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/passwordReset`,data);
    localStorage.removeItem("userId");
    setIsLoading(false);
    reset();
    if(result) router.push('/auth/login')
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            Welcome to <span className="text-blue-500">TESTPE</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Sign up in to access FREE content!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          
          {/* Sign-in form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="conformPassword"
                className="block text-sm text-gray-700"
              >
                Conform Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                {...register("conformPassword", { required: true })}
              />
              {errors.conformPassword && (
                <span className="text-red-600 text-sm">This field is required</span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-2 rounded-md cursor-pointer"
              value="Submit"
            > {isLoading? "Loading...":"submit"}</Button>
          </form>
        </CardContent>
        
        
      </Card>
    </div>
  );
}
