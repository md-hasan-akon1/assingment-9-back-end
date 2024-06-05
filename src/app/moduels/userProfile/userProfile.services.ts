import prisma from "../../sheared/prisma";
import { TVerifyUSer } from "../User/user.interface";

const getMyProfile = async (user: TVerifyUSer | undefined) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { id: user?.id },
    select: {
        id: true,
        name: true,
        email: true,
        phoneNumber:true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true,
      },
  });
  return result;
};
const updateMyProfile = async (user: TVerifyUSer | undefined, payload:any) => {
  const profileData = await prisma.user.findUniqueOrThrow({
    where: { id: user?.id },
    select: {
        // id: true,
        // name: true,
        // email: true,
        // bloodType: true,
        // location: true,
        // availability: true,
        // createdAt: true,
        // updatedAt: true,
        userProfile: true,
      },
  });
const userProfileId=profileData?.userProfile?.id;
const result=await prisma.userProfile.update({
        where:{id:userProfileId},data:payload
})
  return result;
};

export const userProfileServices = {
  getMyProfile,
  updateMyProfile
};
