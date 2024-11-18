import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

 const CloudinaryConnect = (): void => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.API_KEYC!,
      api_secret: process.env.API_SECRET!,
      secure: true,
    });
    console.log("cloudinary connected")
  } catch (error) {
    console.error('Error configuring Cloudinary:', error);
  }
};

export default CloudinaryConnect;