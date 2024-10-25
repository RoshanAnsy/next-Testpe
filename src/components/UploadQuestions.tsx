"use client";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ComboboxDemo } from "./ui/ComboboxDemo";
import { yearData,universityData, semesterData  } from "./data/catched";
import { Inputs } from "@/type/types";
import { Textarea } from "./ui/textarea";
import { DropZone } from "./ui/dropzone";
import {  useState } from "react";
import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation"; // Next.js 13+ for client-side navigation

export default function UploadPepper() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { toast } = useToast();
  // const router = useRouter(); // For showing loading
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For managing dialog state
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [comboboxValues, setComboboxValues] = useState({
    bord: '',
    semester: '',
    year: ''
  });
  // const [thumbnail,setThumbnail] = useState('');

  // Receive files from DropZone
  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
    console.log("Files received from DropZone:", files);
  };
  // Receive combobox changes
  const handleComboboxChange = (field: keyof Inputs, value: string) => {
    setValue(field, value);  // Update the form value
    setComboboxValues((prev) => ({
      ...prev,
      [field]: value as string,
    }));
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    // console.log("from data",data.thumbnail[0]);
    try {
      setIsLoading(true); // Show loading
      if(!data.bord|| !data.semester || !data.year || selectedFiles.length===0) {
        toast({title:"All field are required",description:"please select all fields",
          popover:"auto",
          
        });
    
        return;
      }
      const formData = new FormData();
      const token = localStorage.getItem("token");
      console.log("data check",data.semester,data.year,data.bord)
      formData.append("subject", data.subject);
      formData.append("branch", data.branch as string );
      formData.append("bord", data.bord as string );
      formData.append("semester", data.semester );
      formData.append("year", data.year  );
      formData.append("heading", data.heading as string );
      formData.append("description", data.description as string);
      
      formData.append("token", token as string );
      
      // Append multiple files to FormData
      selectedFiles.forEach((file) => {
        formData.append(`files`, file);
      });
      // Append the thumbnail file
      if (data.thumbnail && data.thumbnail.length > 0) {
        formData.append("file", data.thumbnail[0]);
      }

      // Upload API call
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/prev`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast({ title: "Pepper uploaded successfully" });
      reset({files:null,subject:'',semester:'',branch:'',year:'',bord:'',heading:'',description:'',thumbnail:''}); // Reset form
      // Clear ComboboxDemo values
      setComboboxValues({
        bord: '',
        semester: '',
        year: '',
      });
      
      // Clear selected files in DropZone
      setSelectedFiles([]);
      setIsDialogOpen(false); 
    } catch (error) {
      console.log(error);
      toast({ title: "Pepper not uploaded ",description:"something is issue while uploading " });
    } finally {
      setIsLoading(false); 
    }
    
  };

  

  return (
    <Card className="w-full p-6 rounded-lg shadow-none ">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-black">
          Upload Question <span className="text-blue-500">Pepper</span>
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(() => setIsDialogOpen(true))} className="space-y-6">
        {/* Subject and Branch */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="subject" className="block text-sm text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...register("subject", {required:true})}
            />
          </div>
          <div className="w-full">
            <label htmlFor="branch" className="block text-sm text-gray-700">
              Branch
            </label>
            <input
              id="branch"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...register("branch",{required:true})}
            />
          </div>
        </div>

        {/* Dropdowns for University, Semester, Year */}
        <div className="grid sm:grid-cols-3   gap-4">
        <ComboboxDemo
            drop_down_list={universityData}
            default_value="Select University"
            onChange={(value) => handleComboboxChange('bord', value)}
            selectedValue={comboboxValues.bord}
          />
          <ComboboxDemo
            drop_down_list={semesterData}
            default_value="Select Semester"
            onChange={(value) => handleComboboxChange('semester', value)}
            selectedValue={comboboxValues.semester}
          />
          <ComboboxDemo
            drop_down_list={yearData}
            default_value="Select Year"
            onChange={(value) => handleComboboxChange('year', value)}
            selectedValue={comboboxValues.year}
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
        <div>
          <label htmlFor="thumbnail" className="block text-sm text-gray-700">
            Upload Thumbnail
          </label>
          <input
            id="thumbnail"
            type="file"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("thumbnail", { required: true })}
            
          />
          {errors.thumbnail && (
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

      {/* Alert Dialog for Confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to upload?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will upload the selected files. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit(onSubmit)}>
              {isLoading ? "Loading..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}






