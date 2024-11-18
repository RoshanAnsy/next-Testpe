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
const __1 = require("..");
const createSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId, blocks } = req.body;
        // Clearer names for input fields
        const authenticatedUser = req.user;
        const profileId = Number(authenticatedUser.profileId);
        console.log("solution", authenticatedUser, profileId);
        // Validate required fields
        if (!questionId || !profileId || !blocks || !blocks.length) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        console.log("this is  a solution data", blocks);
        // Create the solution with nested blocks
        const solution = yield __1.prisma.solution.create({
            data: {
                questionId,
                profileId,
                blocks: {
                    create: blocks.map((block, index) => ({
                        type: block.type,
                        content: block.content,
                        level: block.level || null,
                        parentBlockId: block.parentBlockId || null,
                        order: block.order || index,
                        styles: block.styles || null,
                        altText: block.altText || null,
                    })),
                },
            },
        });
        // Update the question to indicate a solution exists
        yield __1.prisma.question.update({
            where: { id: questionId },
            data: { solutionsExist: true },
        });
        if (!solution) {
            res.status(400).json({
                message: "Failed to create solution",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "Solution created successfully",
            success: true,
            solution,
        });
    }
    catch (error) {
        console.error("Error creating solution:", error);
        res.status(500).json({
            message: "Internal server error while creating solution",
            success: false,
        });
    }
});
const getPepperSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solutionId = Number(req.params.solutionId);
        if (!solutionId) {
            res.status(400).json({
                message: "solutionId is missing",
                success: false,
            });
            return;
        }
        //get solution with question and profile details
        const solution = yield __1.prisma.solution.findUnique({
            where: { id: solutionId },
            select: { createdAt: true,
                profile: true,
                updatedAt: true,
                blocks: true,
            }
        });
        if (!solution) {
            res.status(404).json({
                message: "solution not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "solution found",
            success: true,
            solution,
        });
    }
    catch (error) {
        console.error("error fetching solution:", error);
        res.status(500).json({
            message: "internal server error while fetching solution",
            success: false,
        });
    }
});
exports.default = { createSolution, getPepperSolution };
