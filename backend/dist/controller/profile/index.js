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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProfilePhoto = exports.GetAllVerifiedUploadsPepper = exports.GetUserDetails = void 0;
const __1 = require("../..");
const fileUpload_1 = require("../../utils/fileUpload");
const GetUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = Number(user.id);
        const result = yield __1.prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true, name: true, email: true,
            }
        });
        res.status(200).json({
            message: "user details found successfully",
            success: true,
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error while fetching user information",
            success: false,
            error: error,
        });
    }
});
exports.GetUserDetails = GetUserDetails;
const UploadProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = Number(user.id);
        const photo = req.file;
        if (!photo) {
            return res.status(404).json({
                message: "no photo uploaded",
                success: false,
            });
        }
        const Image = yield (0, fileUpload_1.UploadSingleFile)(photo);
        yield __1.prisma.user.update({
            where: { id: userId },
            data: { image: Image },
        });
        res.status(200).json({
            message: "user profile photo updated successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error while updating user profile photo",
            success: false,
            error: error,
        });
    }
});
exports.UploadProfilePhoto = UploadProfilePhoto;
const GetAllVerifiedUploadsPepper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = Number(user.id);
        const result = yield __1.prisma.question.findMany({
            where: { userId: userId, verify: true },
            select: {
                id: true, year: true, heading: true, description: true, thumbnail: true,
            }
        });
        res.status(200).json({
            message: "user verified uploads found successfully",
            success: true,
            result,
            TotalVerifiedPepper: result === null || result === void 0 ? void 0 : result.length,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error while fetching user upload pepper",
            success: false,
            error: error,
        });
    }
});
exports.GetAllVerifiedUploadsPepper = GetAllVerifiedUploadsPepper;
