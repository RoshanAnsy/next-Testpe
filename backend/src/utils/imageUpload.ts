import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import fs from 'fs';

const uploadImagesToCloudinary = async (
  files: any[] | any, // Accepts an array of files or a single file
  folder: string,
  height?: number,
  quality?: string | number
): Promise<(UploadApiResponse | Error)[]> => {
  const uploadResults: (UploadApiResponse | Error)[] = [];
 
  if (!files) {
    throw new Error("No files provided");
  }
  // Convert a single file to an array for uniform handling
  const fileArray = Array.isArray(files) ? files : [files];
  

  for (const file of fileArray) {
    try {
      const options: UploadApiOptions = { folder, resource_type: "auto" };
      if (height) options.height = height;
      if (quality) options.quality = quality;

      const response = await cloudinary.uploader.upload(file.path, options);
      uploadResults.push(response);

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (err) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      uploadResults.push(err as Error);
    }
  }
  
  return uploadResults;
};

export default uploadImagesToCloudinary;
