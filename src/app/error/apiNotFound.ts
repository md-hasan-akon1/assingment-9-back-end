import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

 export const apiNotFound=async (req:Request,res:Response,next:NextFunction) => {
        res.status(httpStatus.NOT_FOUND).json({
                success:false,
                message:"route not found",
                error:`this ${req.originalUrl} route not found`
        })
}