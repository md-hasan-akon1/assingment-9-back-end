import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../app/error/apiError";
import { manageToken } from "../app/utility/manageToken";
import config from "../app/config";
import { Secret } from "jsonwebtoken";
import prisma from "../app/sheared/prisma";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = manageToken.verifyToken(
        token,
        config.accessToken as Secret
      );
      const isUserExist = await prisma.user.findUniqueOrThrow({
        where: { email: verifiedUser.email },
      });
      req.user = verifiedUser;

      // if (roles.length && !roles.includes(verifiedUser.role)) {
      //     throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!")
      // }

     return next();
    } catch (err) {
     return next(err);
    }
  };
};

export default auth;
