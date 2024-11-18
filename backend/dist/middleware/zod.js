"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSchema = exports.UserVote = void 0;
const zod_1 = require("zod");
exports.UserVote = zod_1.z.object({
    name: zod_1.z.string(),
    voting_choice: zod_1.z.boolean(),
    casted_at: zod_1.z.date(),
}).nullable();
const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
exports.imageSchema = zod_1.z.object({
    image: zod_1.z
        .any()
        .refine((file) => (file === null || file === void 0 ? void 0 : file.size) <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file === null || file === void 0 ? void 0 : file.mimetype), " .jpg, .jpeg, .png and .webp")
});
