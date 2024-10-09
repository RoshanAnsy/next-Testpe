"use client"

import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import QuestionCard from "./QuestionCard";
import { Inputs } from "@/type/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { ComboboxDemo } from "../ui/ComboboxDemo";
import ViewPepper from "../pepper/viewPepper";
import { useToast } from "@/hooks/use-toast";


export const universityData = [
  { value: "beu", label: "BEU" },
  { value: "aku", label: "AKU" },
  { value: "cbse", label: "CBSE" },
];

export const yearData = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];

export const semesterData = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];

const staticData: QuestionData[] = [
  { heading: "4-th sem", description: "this is just random data", year: "2023", id: 1 },
  { heading: "4-th sem", description: "this is just random data", year: "2023", id: 2 },
  { heading: "4-th sem", description: "this is just random data", year: "2023", id: 3 },
  { heading: "4-th sem", description: "this is just random data", year: "2023", id: 4 },
];

export interface QuestionData {
  heading: string;
  description: string;
  year: string;
  id: number;
  
}

export interface ViewQuestion {
  bord: string;
  branch: string;
  year: string;
  semester: string;
  subject: string;
  url: string[];
}

export const Search = () => {
  const [question_data, set_data] = useState<QuestionData[]>(staticData);
  const [selectedQuestion, setSelectedQuestion] = useState<ViewQuestion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {toast}=useToast();
  const Get_data = async () => {
    // Uncomment and implement when ready
    // const result = await axios.get("http://localhost:3000/");
    // set_data(result.data); 
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
   
    const url: string = "http://localhost:3000/";
    const result = await axios.post(url, data);
    set_data(result.data);
    // After form submission, scroll to the top
    window.scrollTo({ top: 300, behavior: 'smooth' });
    toast({title:"you search is matched"})
    console.log("backend Data:", result);
  };

  useEffect(() => {
    Get_data();
  }, []);

  const handleCardClick = async (value: number) => {
    const result = await axios.get(`http://localhost:3000/viewpepper?pepperId=${value}`);
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
            <Button type="submit"  className="w-full lg:w-auto">Search</Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 w-full md:max-w-[80vh]">
        {question_data?.map((item) => (
          <QuestionCard key={item.id} data={item} onClick={() => handleCardClick(item.id)} />
        ))}
      </div>

      {isModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <ViewPepper question={selectedQuestion} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};
