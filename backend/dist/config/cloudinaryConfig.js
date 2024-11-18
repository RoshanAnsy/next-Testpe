"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CloudinaryConnect = () => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEYC,
            api_secret: process.env.API_SECRET,
            secure: true,
        });
        console.log("cloudinary connected");
    }
    catch (error) {
        console.error('Error configuring Cloudinary:', error);
    }
};
exports.default = CloudinaryConnect;
