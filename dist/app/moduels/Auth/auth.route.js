"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const requestValidate_1 = require("../../../middleWare/requestValidate");
const auth_interface_1 = require("./auth.interface");
exports.authRoute = express_1.default.Router();
exports.authRoute.post('/login', (0, requestValidate_1.requestValidate)(auth_interface_1.LoginSchema), auth_controller_1.authController.login);
