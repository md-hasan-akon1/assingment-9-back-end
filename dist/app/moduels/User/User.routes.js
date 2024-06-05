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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const utility_1 = require("./utility");
const requestValidate_1 = require("../../../middleWare/requestValidate");
const user_interface_1 = require("./user.interface");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/register", (0, requestValidate_1.requestValidate)(user_interface_1.UserSchema), User_controller_1.userController.createUser);
exports.userRouter.get("/donor-list", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.query = yield (0, utility_1.parseQueryParams)(req.url);
    next();
}), User_controller_1.userController.getUserFromDB);
