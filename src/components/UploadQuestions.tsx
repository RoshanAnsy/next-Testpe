"use client";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ComboboxDemo } from "./ui/ComboboxDemo";
import { yearData, universityData, semesterData } from "./common/Search";
import { Inputs } from "@/type/types";
import { Textarea } from "./ui/textarea";
import { DropZone } from "./ui/dropzone";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPepper() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Receive files from DropZone
  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
    console.log("Files received from DropZone:", files);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("before the form data", data);
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("subject", data.subject);
      formData.append("branch", data.branch || "");
      formData.append("bord", data.bord || "");
      formData.append("semester", data.semester || "");
      formData.append("year", data.year || "");
      formData.append("heading", data.heading || "");
      formData.append("description", data.description || " ");
      formData.append("token", token || "");
      
      // Append multiple files to FormData
      selectedFiles.forEach((file) => {
        formData.append(`files`, file);
      });

      console.log("FormData:", formData);

      const result = await axios.post("http://localhost:3000/prev", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      toast({ title: "Pepper upload successfully" });
      console.log(result, "File upload result");
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <Card className="w-full p-6 rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-black">
          Upload Question <span className="text-blue-500">Pepper</span>
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Subject and Branch */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="subject" className="block text-sm text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...register("subject")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="branch" className="block text-sm text-gray-700">
              Branch
            </label>
            <input
              id="branch"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...register("branch")}
            />
          </div>
        </div>

        {/* Dropdowns for University, Semester, Year */}
        <div className="grid sm:grid-cols-3   gap-4">
          <ComboboxDemo
            drop_down_list={universityData}
            default_value="Select University"
            onChange={(value) => setValue("bord", value)}
          />
          <ComboboxDemo
            default_value="Select Semester"
            drop_down_list={semesterData}
            onChange={(value) => setValue("semester", value)}
          />
          <ComboboxDemo
            drop_down_list={yearData}
            default_value="Select Year"
            onChange={(value) => setValue("year", value)}
          />
        </div>

        {/* Heading */}
        <div>
          <label htmlFor="heading" className="block text-sm text-gray-700">
            Heading for Pepper
          </label>
          <input
            id="heading"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("heading", { required: true })}
          />
          {errors.heading && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm text-gray-700">
            Description of Pepper
          </label>
          <Textarea
            id="description"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}
        </div>

        {/* File Upload */}
        <DropZone onFileChange={handleFileChange} />

        {/* Submit Button */}
        <Button type="submit" className="w-full py-2 rounded-md">
          Submit
        </Button>
      </form>
    </Card>
  );
}
