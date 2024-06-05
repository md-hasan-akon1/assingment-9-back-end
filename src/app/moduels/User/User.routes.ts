import express, { NextFunction, Request, Response } from "express";
import { userController } from "./User.controller";
import { parseQueryParams } from "./utility";
import { requestValidate } from "../../../middleWare/requestValidate";
import { UserSchema } from "./user.interface";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  requestValidate(UserSchema),
  userController.createUser
);
userRouter.get(
  "/donor-list",
  async (req: Request, res: Response, next: NextFunction) => {
    req.query = await parseQueryParams(req.url);
    next();
  },
  userController.getUserFromDB
);

userRouter.get(
  "/donor-list/:id",
  userController.getSingleUser
);
