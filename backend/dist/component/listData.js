"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ListData = (req, res) => {
    try {
        // Create readable stream
        const readerStream = fs_1.default.createReadStream('./Data.json', "utf-8");
        if (!readerStream) {
            res.status(200).json({
                message: "File is empty",
                success: true
            });
        }
        readerStream.pipe(res, { end: true });
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong while reading the file',
            success: false,
            err: err
        });
        console.log(`Something went wrong with the stream: ${err}`);
    }
};
exports.default = ListData;
