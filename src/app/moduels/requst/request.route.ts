import express, { NextFunction, Request, Response } from "express";
import auth from "../../../middleWare/auth";
import { requestController } from "./request.controller";
import { requestValidate } from "../../../middleWare/requestValidate";
import { DonationRequestSchema } from "./request.interface";
export const requestRouter = express.Router();
requestRouter.get("/donation-request", auth(), requestController.getMyRequests);


requestRouter.post("/donation-request", auth(),requestValidate(DonationRequestSchema) ,requestController.donarRequest);


requestRouter.put(
  "/donation-request/:requestId",
  auth(),
  requestController.updateRequest
);
