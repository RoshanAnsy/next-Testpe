import express, { Response, Request, Application } from "express";
import userRoutes from "./routes/user.routes";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import profileRoute from "./routes/public/profile.route"
import cookieParser from 'cookie-parser';
import CloudinaryConnect from "./config/cloudinaryConfig";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import authRoute from "./routes/auth.router";
import adminRoute from "./routes/admin.routes"
const app: Application = express();
export const prisma = new PrismaClient();

export function initRateLimit(limit: number): RateLimitRequestHandler {
    return rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: limit, // Limit each IP to 'limit' requests per windowMs
        standardHeaders: 'draft-7', // Use `RateLimit-*` headers (combined header in draft-7)
        legacyHeaders: false, // Disable legacy `X-RateLimit-*` headers
        message: "Too many requests, please try again after 5 minutes.", // Custom message for rate limit
    });
}

// app.use(); // Limit to 100 requests per 5 minutes

// CORS options
const corsOptions = {
    origin: process.env.frontendUrl, // Use environment variable for frontend URL
    optionsSuccessStatus: 200,
    credentials: true,
};

// Middleware setup
app.use(cors(corsOptions)); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/admin",initRateLimit(100),adminRoute);
app.use("/auth",authRoute);
app.use("/",initRateLimit(100),profileRoute)
app.use("/",initRateLimit(100), userRoutes); // Adjust the route if necessary

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

CloudinaryConnect();

// Start server on port 3000
const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started on port 3000");
});
