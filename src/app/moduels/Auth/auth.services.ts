import prisma from "../../sheared/prisma";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
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
    phoneNumber:isUserExist.phoneNumber,
    id: isUserExist.id,
  };
  const accessToken = jwt.sign(tokenData, config.accessToken as Secret, {
    expiresIn: config.expireIn,
  });
  const refreshToken= jwt.sign(tokenData, config.accessToken as Secret, {
    expiresIn: config.refreshExpireIn,
  });
  return {
    // id: isUserExist.id,
    // name: isUserExist.name,
    // email: isUserExist.email,
    accessToken,
    refreshToken

  };
};
export const authServices = {
  login,
};
