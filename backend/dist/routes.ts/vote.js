"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vote_1 = __importDefault(require("../controller/vote"));
const route = express_1.default.Router();
route.post("/vote", vote_1.default.voteTo);
route.get("/data", vote_1.default.allVoting);
route.get("/results", vote_1.default.totalVoteAtParticularTime);
route.get("/line", vote_1.default.LineChart);
exports.default = route;
