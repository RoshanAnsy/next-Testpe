import ApiError from "./apiErrors";
import { imageSchema } from "../middleware/zod";
import uploadImagesToCloudinary from "./imageUpload";
import fs from "fs";
import path from "path";
import { UploadApiResponse } from 'cloudinary'; 

const fileUpload = async (files: any[]): Promise<(string | ApiError)[]> => {
  try {
    // Validate each file using imageSchema
    const fileUrls: (string | ApiError)[] = [];

    for (const file of files) {
      const fileData = imageSchema.safeParse({ image: file });
      if (!fileData.success) {
        fileUrls.push(new ApiError(400, `${fileData.error}`));
        continue; // Skip invalid files
      }
    }

    const folder: string = process.env.FOLDER_NAME || "";

    // Upload multiple images
    const uploadedImages = await uploadImagesToCloudinary(files, folder);

    // Process the uploaded images' responses
    for (const image of uploadedImages) {
      if (image instanceof Error) {
        fileUrls.push(new ApiError(400, "Image upload failed."));
      } else {
        fileUrls.push(image.secure_url);
      }
    }

    // Delete files after upload using Promises
    const deleteFilePromises = files.map(async (file) => {
      const filePath = path.join(__dirname, file.path); // Ensure the correct path
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      }
    });

    await Promise.all(deleteFilePromises); // Ensure all files are deleted

    return fileUrls;
  } catch (err: any) {
    console.error("Error during file upload or deletion:", err);
    return [new ApiError(500, "An error occurred during the file upload process.")];
  }
};



export async function UploadSingleFile(file: any): Promise<string | ApiError> {
  const folder: string = process.env.FOLDER_NAME || "";

  // Upload the file to Cloudinary
  const uploadedImage = await uploadImagesToCloudinary(file, folder);

  // Check if the result contains an error
  if (uploadedImage[0] instanceof Error) {
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (err) {
      console.error(`Error deleting file: ${file.path}`, err);
    }
    return new ApiError(400, "Image upload failed.");
  }

  // If no error, return the secure URL of the uploaded image
  const image = uploadedImage[0] as UploadApiResponse;
  return image.secure_url;
}


export default fileUpload;
