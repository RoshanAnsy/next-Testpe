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
exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt")); // Assuming bcrypt is imported correctly
const __1 = require(".."); // Assuming prisma instance is correctly imported
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure request body with types
        const { email, name, role, password, conformPassword } = req.body;
        // Validate required fields
        if (!email || !password || !conformPassword) {
            return res.status(400).send("All fields are required");
        }
        // Validate if passwords match
        if (password !== conformPassword) {
            return res.status(400).send("Password and confirm password do not match");
        }
        // Set default values for role and name
        // If role is empty, set to 'user'
        const userName = name ? `${name}` : email.split('@')[0]; // If name is empty, use email's prefix before '@'
        // Check if user already exists
        const isExit = yield __1.prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                email: true,
                name: true,
            },
        });
        if (isExit) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // Secure password (hashing)
        let hashedPassword;
        try {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "server Error at hashing password",
                error: err,
            });
        }
        // Create a new user
        yield __1.prisma.user.create({
            data: {
                email,
                name: userName, // Use the default or provided name
                role, // Use the default or provided role
                password: hashedPassword,
                profile: {
                    create: {}
                }
            }
        });
        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: " internal server error",
            error: error,
        });
    }
});
exports.signup = signup;
//login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'PLease fill all the details carefully',
            });
        }
        //check for registered user
        const user = yield __1.prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                id: true,
                password: true,
                role: true,
                name: true,
                image: true,
                profile: {
                    select: {
                        id: true,
                    }
                },
            },
        });
        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }
        const payload = {
            email: user.email,
            id: user.id,
            role: user.role,
            name: user.name,
            image: user.image,
            profileId: (_a = user.profile) === null || _a === void 0 ? void 0 : _a.id
        };
        //verify password & generate a JWT token
        if (yield bcrypt_1.default.compare(password, user.password)) {
            //password match
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            if (!token) {
                return res.status(400).json({
                    message: "something went wrong while login",
                });
            }
            // user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === 'production',
                sameSite: "lax",
                priority: "medium",
            };
            res.cookie("token", token, options);
            return res.status(200).json({
                success: true,
                payload,
                message: 'User Logged in successfully',
            });
        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server Failure',
            err: error
        });
    }
});
const forgotPasswordRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(401).json({
                message: "inter the email",
                success: false,
            });
        }
        const user = yield __1.prisma.user.findFirst({
            where: { email: email },
            select: {
                id: true
            }
        });
        if (!user) {
            return res.status(401).json({
                message: "user not registered",
                success: false,
            });
        }
        return res.status(200).json({
            message: "user registered successfully",
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: error,
        });
    }
});
//reset password
const passwordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, conformPassword, userId } = req.body;
        if (password === undefined || conformPassword === undefined) {
            return res.status(401).json({
                message: "password and conform password are required ",
                success: false,
            });
        }
        if (password !== conformPassword) {
            return res.status(401).json({
                message: "password and conform password does not matched",
                success: false,
            });
        }
        //secure password
        let hashedPassword;
        try {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
                error: err,
            });
        }
        yield __1.prisma.user.update({
            where: { id: parseInt(userId) },
            data: { password: hashedPassword }
        });
        res.status(200).json({
            message: "password has successfully been updated",
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: "server error while updating password",
            success: false,
            error: error
        });
    }
});
//logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while logging out",
            error: error,
        });
    }
});
exports.default = { signup: exports.signup, login, passwordReset, forgotPasswordRequest, logout };
