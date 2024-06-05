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
exports.requestController = void 0;
const catchAsync_1 = __importDefault(require("../../sheared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../sheared/sendResponse"));
const request_services_1 = require("./request.services");
const donarRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    const result = yield request_services_1.requestServices.donarRequest(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Donors successfully found",
        data: result,
    });
}));
const getRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield request_services_1.requestServices.getRequests(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Donation requests retrieved successfully",
        data: result,
    });
}));
const updateRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const updateData = req.body;
    const result = yield request_services_1.requestServices.updateRequest(requestId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Donation request status successfully updated",
        data: result,
    });
}));
exports.requestController = {
    donarRequest,
    getRequests,
    updateRequest,
};
