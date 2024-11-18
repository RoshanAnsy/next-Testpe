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
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const uploadImagesToCloudinary = (files, // Accepts an array of files or a single file
folder, height, quality) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadResults = [];
    if (!files) {
        throw new Error("No files provided");
    }
    // Convert a single file to an array for uniform handling
    const fileArray = Array.isArray(files) ? files : [files];
    for (const file of fileArray) {
        try {
            const options = { folder, resource_type: "auto" };
            if (height)
                options.height = height;
            if (quality)
                options.quality = quality;
            const response = yield cloudinary_1.v2.uploader.upload(file.path, options);
            uploadResults.push(response);
            if (fs_1.default.existsSync(file.path)) {
                fs_1.default.unlinkSync(file.path);
            }
        }
        catch (err) {
            if (fs_1.default.existsSync(file.path)) {
                fs_1.default.unlinkSync(file.path);
            }
            uploadResults.push(err);
        }
    }
    return uploadResults;
});
exports.default = uploadImagesToCloudinary;
