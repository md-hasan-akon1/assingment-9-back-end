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
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../app/error/apiError"));
const manageToken_1 = require("../app/utility/manageToken");
const config_1 = __importDefault(require("../app/config"));
const prisma_1 = __importDefault(require("../app/sheared/prisma"));
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = manageToken_1.manageToken.verifyToken(token, config_1.default.accessToken);
            const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
                where: { email: verifiedUser.email },
            });
            req.user = verifiedUser;
            // if (roles.length && !roles.includes(verifiedUser.role)) {
            //     throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!")
            // }
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.default = auth;
