import { userServices } from "./User.services";
import sendResponse from "../../sheared/sendResponse";

import catchAsync from "../../sheared/catchAsync";
import { Request } from "express";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

//get user data from db with search and filter
const getUserFromDB = catchAsync(async (req, res) => {
  const result = await userServices.getUserFromDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const id=req.params.id
  console.log(id);
  const result = await userServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donor successfully found",
    data: result
  });
});


export const userController = {
  createUser,
  getUserFromDB,
  getSingleUser

};
