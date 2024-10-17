"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router=useRouter();
  const {toast}=useToast();
  const[isLoading,setIsLoading]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
 
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);  
    try {
      // API call to login
      const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);
      console.log("login details",result)
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("name", result.data.payload.name);
      localStorage.setItem("email", result.data.payload.email);
      localStorage.setItem("image", result.data.payload.image);
      toast({ title: "Login successful!", description: "success" });
      reset();
      setIsLoading(false);
      if (result) router.push("/");
      
    } catch (error:unknown ) {
       if (error instanceof AxiosError){
         if (error.response?.status === 400) {
            toast({ title: error.message, description: "error" });
          }  if (error.response?.status === 401) {
            toast({ title: "User not found", description: "error" });
          } else if (error.response?.status === 500) {
            toast({ title: "Server error", description: "error" });
          } 
          else if (error.response?.status === 403) {
            toast({ title: "password Incorrect", description: "error" });
          }else {
            toast({ title: "Something went wrong", description: "error" });
          }
       }
        
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            Welcome to <span className="text-blue-500">TESTPE</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Log in to access FREE content!
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700"
              >
                Password
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

            <Button
              type="submit"
              className="w-full py-2 rounded-md cursor-pointer"
              value="Submit"
            > {isLoading? "Loading...":"Log In"}</Button>
          </form>
          <Link href='/auth/forgatepassword' className="text-blue-500 text-xs m-1">Forgate password</Link>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center gap-2 mt-6">
          <hr className="w-full border-gray-300" />
          <div className="flex items-center gap-2">
              <p className="text-blue-500 text-xs">do not have account</p>
              <Link href={"/auth/signup"}  >signup</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
