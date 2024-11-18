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
const __1 = require("../");
const zod_1 = require("../middleware/zod");
const zod_2 = require("zod");
const voteTo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, voting_choice, casted_at } = req.body;
        if (!name || !casted_at) {
            return res.status(200).json("all field are required");
        }
        const date = new Date(casted_at);
        const parseData = zod_1.UserVote.parse({ name, voting_choice, casted_at: date });
        let response = yield __1.prisma.vote.create({
            data: parseData,
        });
        return res.send(response);
    }
    catch (err) {
        if (err instanceof zod_2.ZodError)
            res.send(err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});
//get the data of total voting
const allVoting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currNo, nextNo } = req.query;
        const skip = Number(currNo);
        const take = Number(nextNo);
        console.log(skip, take);
        const response = yield __1.prisma.vote.findMany({ skip, take });
        res.send(response);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err,
        });
    }
});
//get all number of vote at particular time
const totalVoteAtParticularTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield __1.prisma.vote.groupBy({
            by: ['voting_choice'],
            _count: {
                voting_choice: true,
            },
        });
        res.send(response);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err,
        });
    }
});
const LineChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let map = new Map();
        const response = yield __1.prisma.vote.groupBy({
            by: ['casted_at'],
            _count: {
                voting_choice: true,
            }
        });
        response.forEach((item) => {
            const [date, timeWithTimezone] = item.casted_at.toISOString().split("T");
            map.set(date, item._count.voting_choice);
        });
        let LineChartBid = [];
        map.forEach((key, value) => LineChartBid.push({ count: key, date: value, }));
        return res.send(LineChartBid);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});
exports.default = { voteTo, allVoting, totalVoteAtParticularTime, LineChart };
