import { Request } from "express";
import catchAsync from "../../sheared/catchAsync";
import sendResponse from "../../sheared/sendResponse";
import { userProfileServices } from "./userProfile.services";
import { TVerifyUSer } from "../User/user.interface";

const getMyProfile = catchAsync(async (req: Request & { user?: TVerifyUSer|undefined }, res) => {
  const user = req.user;
  const result = await userProfileServices.getMyProfile(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",

    data: result,
  });
});
const updateMyProfile = catchAsync(async (req: Request & { user?: TVerifyUSer|undefined }, res) => {
  const user = req.user;
  const updatedData=req.body
  const result = await userProfileServices.updateMyProfile(user,updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",

    data: result,
  });
});

export const userProfileController = {
  getMyProfile,
  updateMyProfile
};
