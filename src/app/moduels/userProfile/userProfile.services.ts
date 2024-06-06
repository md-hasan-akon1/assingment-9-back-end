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
  
  });

// const userProfileId=profileData?.userProfile?.id;

// const result=await prisma.userProfile.update({
//         where:{id:userProfileId},data:payload
// })
//   return result;

const {userProfile,...rest}=payload
if(rest){
 await prisma.user.update({where:{id:user?.id},data:rest})
}
if(userProfile){
  await prisma.userProfile.update({where:{userId:user?.id},data:userProfile})
}
const result= await prisma.user.findUniqueOrThrow({
  where: { id: user?.id },
  select:{
    id:true,
    name:true,
    email:true,
    phoneNumber:true,
    bloodType:true,
    location:true,
    availability:true,
    userProfile:true
  }

});

return result

};

export const userProfileServices = {
  getMyProfile,
  updateMyProfile
};
