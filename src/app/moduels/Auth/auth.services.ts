import prisma from "../../sheared/prisma";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../error/apiError";
import { TVerifyUSer } from "../User/user.interface";
export interface TPasswordData {
  oldPassword: string;
  newPassword: string;
  conPassword: string;
}

const login = async (data: any) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
    },
  });
  const isCorrectPass = await argon2.verify(
    isUserExist.password,
    data.password
  );
  if (!isCorrectPass) {
    throw new Error("incorrect password");
  }
  //const hashPass = await argon2.hash(data.password);
  const tokenData = {
    name: isUserExist.name,
    email: isUserExist.email,
    phoneNumber: isUserExist.phoneNumber,
    id: isUserExist.id,
  };
  const accessToken = jwt.sign(tokenData, config.accessToken as Secret, {
    expiresIn: config.expireIn,
  });
  const refreshToken = jwt.sign(tokenData, config.accessToken as Secret, {
    expiresIn: config.refreshExpireIn,
  });
  return {
    // id: isUserExist.id,
    // name: isUserExist.name,
    // email: isUserExist.email,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  payload: TPasswordData,
  user: TVerifyUSer | undefined
) => {
  if (!user) {
    throw new ApiError(401, "you are not authorized");
  }
  if (payload.newPassword !== payload.conPassword) {
    throw new ApiError(401, "new password and conPassword did not match");
  }
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  const verifyPass = await argon2.verify(
    isUserExist.password,
    payload.oldPassword
  );

  if (!verifyPass) {
    throw new ApiError(401, "current password  did not match");
  }

  const hashPass = await argon2.hash(payload.newPassword);

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: { password: hashPass },
  });

  return{
    message:"Change password successfully"
  }
};
export const authServices = {
  login,
  changePassword,
};
