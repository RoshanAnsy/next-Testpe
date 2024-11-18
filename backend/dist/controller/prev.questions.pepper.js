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
const fileUpload_1 = __importDefault(require("../utils/fileUpload"));
const __1 = require("..");
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const fileUpload_2 = require("../utils/fileUpload");
//entry a pepper 
const addPrevYearPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, year, semester, branch, bord, heading, description } = req.body;
        // console.log("this coming data,",bord as string)
        const user = req.user;
        const Id = Number(user.id);
        const filesField = req.files;
        const files = filesField === null || filesField === void 0 ? void 0 : filesField['files'];
        const file = (filesField === null || filesField === void 0 ? void 0 : filesField['file']) ? filesField['file'][0] : undefined;
        if (file == null || file == undefined && (!files || files.length === 0)) {
            return res.status(400).json({ error: "No files uploaded." });
        }
        // Assuming you're using multer to handle multiple file uploads
        // const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        // const files = req.files?.['files'] as Express.Multer.File[];
        // const file: Express.Multer.File | undefined = req.file;
        // Upload files and get an array of URLs
        const imageUrls = yield (0, fileUpload_1.default)(files);
        // Ensure fileUpload returns string[]
        // Check for errors in the uploaded files (assuming the function may throw)
        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).send("Error in file upload or no files uploaded");
        }
        const thumbnailUrl = yield (0, fileUpload_2.UploadSingleFile)(file);
        if (thumbnailUrl instanceof apiErrors_1.default) {
            return res.status(400).json({ error: "Error uploading thumbnail" });
        }
        // Insert the question data along with the array of URLs into the database
        const result = yield __1.prisma.question.create({
            data: {
                subject,
                year,
                semester,
                branch,
                bord,
                images: imageUrls, // Directly pass the array of image URLs
                heading,
                description,
                thumbnail: thumbnailUrl,
                userId: Id,
                verify: false,
            }
        });
        // Return the created result back to the client
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Server error: ", error);
        return res.status(500).json({ error: "An error occurred on the server" });
    }
});
const getAllPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bord, year, semester, subject } = req.body;
        if (!subject) {
            return res.status(400).json({ error: "Subject is required" });
        }
        const filter = { subject: { contains: subject, mode: 'insensitive' } };
        if (bord)
            filter.bord = bord;
        if (year)
            filter.year = year;
        if (semester)
            filter.semester = semester;
        const result = yield __1.prisma.question.findMany({
            where: Object.assign(Object.assign({}, filter), { verify: true }),
            select: {
                year: true, heading: true, description: true, id: true, thumbnail: true,
            }
        });
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});
//get the image of pepper and all detail by Id
const viewPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pepperId = Number(req.query.pepperId);
        if (isNaN(pepperId)) {
            return res.status(400).json({ error: "Invalid pepper ID" });
        }
        const result = yield __1.prisma.question.findUnique({
            where: { id: pepperId, verify: true },
            select: {
                bord: true, branch: true,
                year: true, semester: true,
                subject: true, images: true
            }
        });
        if (!result) {
            return res.status(404).json({ error: "Pepper not found" });
        }
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});
//get the unverified pepper
const getUnverifiedPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = yield __1.prisma.question.findMany({
            where: { verify: false },
            skip: skip,
            take: limit,
        });
        res.status(200).json({
            message: "successfully retrieved the unverified pepper",
            success: true,
            result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error while fetching the unverified pepper",
            success: false,
            error: error,
        });
    }
});
//pepper verify by admin
const verifyPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pepperId = Number(req.query.pepperId);
        const status = Boolean(req.body.status);
        if (!pepperId || !status) {
            res.status(400).json({
                message: "pepperId is missing",
                success: false,
            });
        }
        if (status) {
            yield __1.prisma.question.update({
                where: { id: pepperId },
                data: { verify: status }
            });
        }
        else {
            yield __1.prisma.question.delete({
                where: { id: pepperId }
            });
        }
        res.status(200).json({
            message: `${status ? "pepper verify successfully" : "pepper delete successfully"}`,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error while verifying the pepper ",
            success: false,
            error: error,
        });
    }
});
exports.default = { addPrevYearPepper, getAllPepper, viewPepper, verifyPepper, getUnverifiedPepper };
