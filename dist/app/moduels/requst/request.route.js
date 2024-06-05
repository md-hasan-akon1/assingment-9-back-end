"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middleWare/auth"));
const request_controller_1 = require("./request.controller");
const requestValidate_1 = require("../../../middleWare/requestValidate");
const request_interface_1 = require("./request.interface");
exports.requestRouter = express_1.default.Router();
exports.requestRouter.get("/donation-request", (0, auth_1.default)(), request_controller_1.requestController.getRequests);
exports.requestRouter.post("/donation-request", (0, auth_1.default)(), (0, requestValidate_1.requestValidate)(request_interface_1.DonationRequestSchema), request_controller_1.requestController.donarRequest);
exports.requestRouter.put("/donation-request/:requestId", (0, auth_1.default)(), request_controller_1.requestController.updateRequest);
