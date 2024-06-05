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
exports.requestServices = void 0;
const prisma_1 = __importDefault(require("../../sheared/prisma"));
const donarRequest = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const requestData = {
        donorId: payload.donorId,
        requesterId: user.id,
        phoneNumber: payload.phoneNumber,
        dateOfDonation: payload.dateOfDonation,
        hospitalName: payload.hospitalName,
        hospitalAddress: payload.hospitalAddress,
        reason: payload.reason,
    };
    const createRequest = yield prisma_1.default.request.create({
        data: requestData,
        include: {
            donor: {
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
            },
        },
    });
    return createRequest;
});
const getRequests = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.request.findMany({
        where: {
            donorId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            requester: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                },
            },
        },
    });
    return result;
});
const updateRequest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.request.findUniqueOrThrow({
        where: { id: id },
    });
    const result = yield prisma_1.default.request.update({
        where: { id },
        data: { requestStatus: payload.status }
    });
    return result;
});
exports.requestServices = {
    donarRequest,
    getRequests,
    updateRequest,
};
