"use client";

import axios from "axios";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import React, { useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useToast } from "@/hooks/use-toast";
interface PepperData {
  heading: string;
  description: string;
  year: number;
  thumbnail?: string;
}

const VerifiedPepper: React.FC = () => {
  const [data, setData] = useState<PepperData[]>([]);
  const ref = useRef<LoadingBarRef>(null);
  const {toast}=useToast();
  const GetPepper = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        if(ref.current)  ref.current.continuousStart()
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/verifyPepper?token=${token}`
        );
        if (response?.data?.result){
          if(ref.current)  ref.current.complete()
            setData(response.data.result);
          toast({title:`${data.length==0 ? "No any pepper verify yet" : "All these are verified by testpe"}`})
        } 
      }
    } catch (error) {
      console.error("Error fetching pepper data:", error);
    }
  };

  useEffect(() => {
    GetPepper();
  }, []);

  return (

    <div className=" flex flex-col justify-center items-center">
        <h1 className="text-sm sm:text-xl font-bold mb-4 bg-neutral-200 p-2 rounded-sm">Verified pepper</h1>
        <LoadingBar color='#063970'
        waitingTime={1000} 
        height={4}
         ref={ref} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      {data?.map((item, index) => (
        <div
          key={index}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl cursor-pointer"
        >
           { item.thumbnail &&
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <Image
                className="absolute top-0 left-0 w-full h-full rounded-t-md object-cover"
                src={item?.thumbnail as string}
                alt="thumbnail"
                layout="fill"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL="/path-to-blur-image.jpg"
                />
            </div>}
          
          <div className="p-5">
            <a>
              <h5
                className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl md:text-2xl"
                style={{ fontFamily: "New York" }}
              >
                {item.heading}
              </h5>
            </a>
            <p
              className="mb-4 text-xs font-normal text-gray-700 dark:text-gray-400 sm:text-sm md:text-base lg:text-lg"
              style={{ fontFamily: "New York, serif" }}
            >
              {item.description}
            </p>
            <div className="flex flex-row sm:items-center gap-4">
              <Button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white">
                View
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Button>
              <span className="text-gray-500 dark:text-gray-400">{`Year: ${item.year}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default VerifiedPepper;
