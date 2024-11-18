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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || req.body.token || req.query.token;
        console.log("this is coming from cokkies", (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.token);
        if (!token || token == undefined) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }
        //verify the token
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // console.log("user payload",payload);
            req.user = payload;
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
                error: error
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong, while verifying the token',
            error: error,
        });
    }
});
//signIn email checks
const signInEmailVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        if (userEmail && userEmail.toLowerCase().endsWith('@gmail.com')) {
            next();
        }
        else {
            res.status(400).json({
                message: "Enter a valid email",
                success: false,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "this email did not exist",
            success: false,
            message2: "user did not created try with valid email",
            err: error
        });
    }
});
//verify password
const verifyPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPass = req.body.password;
        if (userPass.length >= 8 &&
            /[A-Z]/.test(userPass) &&
            /[a-z]/.test(userPass) &&
            /\d/.test(userPass) &&
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(userPass)) {
            next();
        }
        else {
            res.status(500).json({
                message: "password did not contain all 8 characters including capital,small,numercial,special characters",
                success: false,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "password did not contain all 8 characters",
            success: false,
            err: error
        });
    }
});
//verify are admin or not
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.user;
        if (userRole.role != 'admin') {
            return res.status(403).json({
                message: "you can not access this route",
                success: false,
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error while verify role",
            success: false,
            error: error,
        });
    }
});
// exports.pdfToText=async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const pdfFile=req.files as any
//         console.log(pdfFile)
//         const readfile = fs.readFileSync(pdfFile.path, {encoding:"utf-8"}); 
//     console.log(readfile)
//     next();
//     res.send(readfile)
//     }catch(err){
//         console.log("something went wrong",err)
//         res.send("something went wrong")
//     }
// }
exports.default = { signInEmailVerify, verifyPassword, auth, verifyAdmin };
