"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("./app/routers");
const globalErrorHandler_1 = __importDefault(require("./middleWare/globalErrorHandler"));
const apiNotFound_1 = require("./app/error/apiNotFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
exports.port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api", routers_1.router);
app.use(globalErrorHandler_1.default);
app.use(apiNotFound_1.apiNotFound);
exports.default = app;
