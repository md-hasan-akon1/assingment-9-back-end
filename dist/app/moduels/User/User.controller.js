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
exports.userController = void 0;
const User_services_1 = require("./User.services");
const sendResponse_1 = __importDefault(require("../../sheared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../sheared/catchAsync"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_services_1.userServices.createUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
//get user data from db with search and filter
const getUserFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_services_1.userServices.getUserFromDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Donors successfully found",
        meta: result.meta,
        data: result.data,
    });
}));
exports.userController = {
    createUser,
    getUserFromDB,
};
