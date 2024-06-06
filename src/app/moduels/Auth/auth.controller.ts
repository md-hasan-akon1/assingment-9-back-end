import { Request } from "express";
import config from "../../config";
import catchAsync from "../../sheared/catchAsync"
import sendResponse from "../../sheared/sendResponse";
import { authServices } from "./auth.services"
import { TVerifyUSer } from "../User/user.interface";


const login=catchAsync(async(req,res)=>{
        const result=await authServices.login(req.body)
        const { refreshToken } = result;
        const cookieOptions = {
                secure: config.nodeEnv === 'production',
                httpOnly: true,
              };
            
              res.cookie('refreshToken', refreshToken, cookieOptions);
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "User logged in successfully",
                data: result,
              });
})
const changePassword=catchAsync(async(req: Request & { user?: TVerifyUSer|undefined },res)=>{
        const body=req.body
        const user=req.user
       const result= await authServices.changePassword(body,user)
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Change password successfully",
                data: result,
              });
})


export const authController={
        login,
        changePassword
}