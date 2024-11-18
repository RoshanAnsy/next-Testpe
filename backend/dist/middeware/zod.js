"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVote = void 0;
const zod_1 = require("zod");
exports.UserVote = zod_1.z.object({
    name: zod_1.z.string(),
    voting_choice: zod_1.z.boolean(),
    casted_at: zod_1.z.date(),
}).nullable();
