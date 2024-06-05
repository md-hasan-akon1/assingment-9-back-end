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
exports.authServices = void 0;
const prisma_1 = __importDefault(require("../../sheared/prisma"));
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: data.email,
        },
    });
    const isCorrectPass = yield argon2_1.default.verify(isUserExist.password, data.password);
    if (!isCorrectPass) {
        throw new Error("incorrect password");
    }
    //const hashPass = await argon2.hash(data.password);
    const tokenData = {
        name: isUserExist.name,
        email: isUserExist.email,
        id: isUserExist.id,
    };
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.default.accessToken, {
        expiresIn: config_1.default.expireIn,
    });
    return {
        id: isUserExist.id,
        name: isUserExist.name,
        email: isUserExist.email,
        token,
    };
});
exports.authServices = {
    login,
};
