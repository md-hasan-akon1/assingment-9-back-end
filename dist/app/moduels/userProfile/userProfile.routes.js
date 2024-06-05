"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const userProfile_controller_1 = require("./userProfile.controller");
const auth_1 = __importDefault(require("../../../middleWare/auth"));
exports.userProfileRouter = express_1.default.Router();
exports.userProfileRouter.get("/my-profile", (0, auth_1.default)(), userProfile_controller_1.userProfileController.getMyProfile);
exports.userProfileRouter.put("/my-profile", (0, auth_1.default)(), userProfile_controller_1.userProfileController.updateMyProfile);
