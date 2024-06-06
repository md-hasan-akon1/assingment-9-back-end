import  express   from "express";
import { authController } from "./auth.controller";
import { requestValidate } from "../../../middleWare/requestValidate";
import { LoginSchema } from "./auth.interface";
import auth from "../../../middleWare/auth";
export const authRoute=express.Router()


authRoute.post('/login',requestValidate(LoginSchema), authController.login)
authRoute.put('/change-password',auth(), authController.changePassword)