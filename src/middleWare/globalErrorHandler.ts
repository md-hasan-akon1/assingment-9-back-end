import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodIssue } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (err.name === "ZodError") {
    const messages = err.issues?.map((error: any) => error.message);

    // Joining the message properties into a single string
    const joinedMessages = messages.join(", ");
    const errorDetails = err.issues?.map((issue: ZodIssue) => {
      return {
        field: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: joinedMessages || "Something went wrong!",
      errorDetails,
      // error: err
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message:err.message || "Something went wrong!",
    error: err,
  });
};

export default globalErrorHandler;
