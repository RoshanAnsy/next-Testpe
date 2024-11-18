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
const ValidateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAnswers, questions } = req.body;
        // console.log(userAnswers, questions)
        let score = 0;
        let correctQuestions = 0;
        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i] === questions[i].answer) {
                score += 5;
                correctQuestions++;
            }
        }
        const wrongQuestions = questions.length - correctQuestions;
        return res.status(200).json({
            score,
            correctQuestions,
            wrongQuestions,
            message: "successful get the result",
        });
    }
    catch (err) {
        res.status(400).json({
            message: "questions validations failed",
            success: false,
            error: err,
        });
    }
});
exports.default = { ValidateAnswer };
