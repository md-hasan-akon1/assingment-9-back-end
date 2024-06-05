"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const User_routes_1 = require("../moduels/User/User.routes");
const auth_route_1 = require("../moduels/Auth/auth.route");
const request_route_1 = require("../moduels/requst/request.route");
const userProfile_routes_1 = require("../moduels/userProfile/userProfile.routes");
exports.router = express_1.default.Router();
const modules = [
    {
        path: '/',
        route: User_routes_1.userRouter
    },
    {
        path: '/',
        route: auth_route_1.authRoute
    },
    {
        path: '/',
        route: request_route_1.requestRouter
    },
    {
        path: '/',
        route: userProfile_routes_1.userProfileRouter
    },
];
modules.forEach(element => {
    exports.router.use(element.path, element.route);
});
