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
exports.userProfileServices = void 0;
const prisma_1 = __importDefault(require("../../sheared/prisma"));
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
        select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            location: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        },
    });
    return result;
});
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profileData = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
        select: {
            // id: true,
            // name: true,
            // email: true,
            // bloodType: true,
            // location: true,
            // availability: true,
            // createdAt: true,
            // updatedAt: true,
            userProfile: true,
        },
    });
    const userProfileId = (_a = profileData === null || profileData === void 0 ? void 0 : profileData.userProfile) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield prisma_1.default.userProfile.update({
        where: { id: userProfileId }, data: payload
    });
    return result;
});
exports.userProfileServices = {
    getMyProfile,
    updateMyProfile
};
