import express from "express";
import { userProfileController } from "./userProfile.controller";
import auth from "../../../middleWare/auth";

export const userProfileRouter = express.Router();

userProfileRouter.get("/my-profile",auth(),userProfileController.getMyProfile)
userProfileRouter.put("/update-profile",auth(),userProfileController.updateMyProfile)