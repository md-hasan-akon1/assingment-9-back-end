import { Request } from "express";
import catchAsync from "../../sheared/catchAsync";
import sendResponse from "../../sheared/sendResponse";
import { userServices } from "../User/User.services";
import { requestServices } from "./request.services";

const donarRequest = catchAsync(async (req: Request & { user?: any }, res) => {
  const data = req.body;
  const user = req.user;
  const result = await requestServices.donarRequest(data, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Donors successfully found",

    data: result,
  });
});
const getRequests = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user;
  const result = await requestServices.getRequests(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donation requests retrieved successfully",

    data: result,
  });
});

const updateRequest = catchAsync(async (req, res) => {
  const {requestId}=req.params
  const updateData=req.body
        const result = await requestServices.updateRequest(requestId,updateData);
        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Donation request status successfully updated",
      
          data: result,
        });
      });
export const requestController = {
  donarRequest,
  getRequests,
  updateRequest,
};
