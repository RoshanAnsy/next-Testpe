"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.initRateLimit = initRateLimit;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const profile_route_1 = __importDefault(require("./routes/public/profile.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinaryConfig_1 = __importDefault(require("./config/cloudinaryConfig"));
const express_rate_limit_1 = require("express-rate-limit");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
function initRateLimit(limit) {
    return (0, express_rate_limit_1.rateLimit)({
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
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/admin", initRateLimit(100), admin_routes_1.default);
app.use("/auth", auth_router_1.default);
app.use("/", initRateLimit(100), profile_route_1.default);
app.use("/", initRateLimit(100), user_routes_1.default); // Adjust the route if necessary
app.get("/", (req, res) => {
    res.send("Server is running");
});
(0, cloudinaryConfig_1.default)();
// Start server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started on port 3000");
});
