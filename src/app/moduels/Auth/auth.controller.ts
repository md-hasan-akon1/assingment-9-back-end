import config from "../../config";
import catchAsync from "../../sheared/catchAsync"
import sendResponse from "../../sheared/sendResponse";
import { authServices } from "./auth.services"


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


export const authController={
        login
}