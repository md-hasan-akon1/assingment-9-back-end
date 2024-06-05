"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    if (err.name === "ZodError") {
        const messages = (_a = err.issues) === null || _a === void 0 ? void 0 : _a.map((error) => error.message);
        // Joining the message properties into a single string
        const joinedMessages = messages.join(", ");
        const errorDetails = (_b = err.issues) === null || _b === void 0 ? void 0 : _b.map((issue) => {
            return {
                field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: joinedMessages || "Something went wrong!",
            errorDetails,
            // error: err
        });
    }
    console.log(err.code);
    return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: err,
    });
};
exports.default = globalErrorHandler;
