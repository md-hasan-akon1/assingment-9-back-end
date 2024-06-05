import  express   from "express";
import { authController } from "./auth.controller";
import { requestValidate } from "../../../middleWare/requestValidate";
import { LoginSchema } from "./auth.interface";
export const authRoute=express.Router()


authRoute.post('/login',requestValidate(LoginSchema), authController.login)