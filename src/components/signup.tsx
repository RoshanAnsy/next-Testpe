"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Inputs = {
  email: string;
  password: string;
  conformPassword:string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<Inputs>();
  const router=useRouter();
  
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    const result=await axios.post("http://localhost:3000/signup",data);
    console.log(result);
    if(result) router.push('/login')
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
            > submit</Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center gap-2 mt-6">
          <hr className="w-full border-gray-300" />
          <div className="flex items-center gap-2">
          <p className="text-blue-500 text-xs">I have all ready signup</p>
          <Link href={"/login"}>Login</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
