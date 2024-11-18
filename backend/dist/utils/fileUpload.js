"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSingleFile = UploadSingleFile;
const apiErrors_1 = __importDefault(require("./apiErrors"));
const zod_1 = require("../middleware/zod");
const imageUpload_1 = __importDefault(require("./imageUpload"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileUpload = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate each file using imageSchema
        const fileUrls = [];
        for (const file of files) {
            const fileData = zod_1.imageSchema.safeParse({ image: file });
            if (!fileData.success) {
                fileUrls.push(new apiErrors_1.default(400, `${fileData.error}`));
                continue; // Skip invalid files
            }
        }
        const folder = process.env.FOLDER_NAME || "";
        // Upload multiple images
        const uploadedImages = yield (0, imageUpload_1.default)(files, folder);
        // Process the uploaded images' responses
        for (const image of uploadedImages) {
            if (image instanceof Error) {
                fileUrls.push(new apiErrors_1.default(400, "Image upload failed."));
            }
            else {
                fileUrls.push(image.secure_url);
            }
        }
        // Delete files after upload using Promises
        const deleteFilePromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const filePath = path_1.default.join(__dirname, file.path); // Ensure the correct path
            try {
                if (fs_1.default.existsSync(file.path)) {
                    fs_1.default.unlinkSync(file.path);
                }
            }
            catch (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            }
        }));
        yield Promise.all(deleteFilePromises); // Ensure all files are deleted
        return fileUrls;
    }
    catch (err) {
        console.error("Error during file upload or deletion:", err);
        return [new apiErrors_1.default(500, "An error occurred during the file upload process.")];
    }
});
function UploadSingleFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = process.env.FOLDER_NAME || "";
        // Upload the file to Cloudinary
        const uploadedImage = yield (0, imageUpload_1.default)(file, folder);
        // Check if the result contains an error
        if (uploadedImage[0] instanceof Error) {
            try {
                if (fs_1.default.existsSync(file.path)) {
                    fs_1.default.unlinkSync(file.path);
                }
            }
            catch (err) {
                console.error(`Error deleting file: ${file.path}`, err);
            }
            return new apiErrors_1.default(400, "Image upload failed.");
        }
        // If no error, return the secure URL of the uploaded image
        const image = uploadedImage[0];
        return image.secure_url;
    });
}
exports.default = fileUpload;
