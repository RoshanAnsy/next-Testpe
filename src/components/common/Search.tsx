"use client"

import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import QuestionCard from "./QuestionCard";
import { Inputs } from "@/type/types";
import axios from "axios";
import { useState } from "react";
import { ComboboxDemo } from "../ui/ComboboxDemo";
import ViewPepper from "../pepper/viewPepper";
import { useToast } from "@/hooks/use-toast";
import { yearData,universityData,semesterData } from "../data/catched";
import { ViewQuestion } from "@/type/types";
import { QuestionData } from "@/type/types";
import { staticData } from "../data/catched";
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

import React, { useRef } from 'react'
export const Search = () => {
  const [question_data, set_data] = useState<QuestionData[]>(staticData);
  const [selectedQuestion, setSelectedQuestion] = useState<ViewQuestion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {toast}=useToast();
  const[isLoading,setIsLoading]=useState(false)
  const ref = useRef<LoadingBarRef>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    if(ref.current)  ref.current.continuousStart()
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/`;
    const result = await axios.post(url, data);
    if(ref.current)  ref.current.complete();
    set_data(result.data);
    window.scrollTo({ top: 300, behavior: 'smooth' });
    toast({title:`${result?.data.length>0 ? "you search is matched" : "Related to your search nothing found"}`})
    setIsLoading(false);
  };

 

  const handleCardClick = async (value: number) => {
    if(ref.current)  ref.current.continuousStart()
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viewpepper?pepperId=${value}`);
    if(ref.current)  ref.current.complete();
    console.log("after the click on card", result);
    setSelectedQuestion(result.data);
    setIsModalOpen(true);
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-2 md:p-4 lg:p-6">
        <LoadingBar color='#063970'
        waitingTime={1000} 
        height={4}
         ref={ref} />
       <div className="w-full max-w-6xl ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 lg:flex-row lg:gap-8  p-1"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-1  bg-neutral-100 rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 p-2 md:p-4 w-full">
            <ComboboxDemo
              drop_down_list={universityData}
              default_value="Select university"
              onChange={(value) => setValue("bord", value)}
            />
            <ComboboxDemo
              drop_down_list={yearData}
              default_value="Select Year"
              onChange={(value) => setValue("year", value)}
            />
          </div>
          <div className=" grid grid-cols-2 md:gird-row-2 gap-x-1   bg-neutral-100 rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 p-2 md:p-4 w-full">
            <ComboboxDemo
              drop_down_list={semesterData}
              default_value="Select semester"
              onChange={(value) => setValue("semester", value)}
            />
            <Input
              placeholder="Enter your subject name"
              {...register("subject", { required: true })}
              className=" bg-white "
            />
          </div>
          <div className="p-4">
            {errors.subject && (
              <span className="text-red-500">This field is required</span>
            )}
            <Button type="submit"  className="w-full lg:w-auto">{isLoading? "searching...":"search"}</Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 w-full md:max-w-[80vh]">
        {question_data?.map((item) => (
          <QuestionCard key={item.id} data={item} onClick={() => handleCardClick(item.id)} />
        ))}
      </div>

      {isModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full border ">
            <ViewPepper  question={selectedQuestion} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
    
  );
};
