import prisma from "../../sheared/prisma";
import { TDonarRequest, TVerifyUSer } from "../User/user.interface";

const donarRequest = async (payload: TDonarRequest, user: TVerifyUSer) => {
  const requestData = {
    donorId: payload.donorId,
    requesterId: user.id,
    phoneNumber: payload.phoneNumber,
    dateOfDonation: payload.dateOfDonation,
    hospitalName: payload.hospitalName,
    hospitalAddress: payload.hospitalAddress,
    reason: payload.reason,
  };
  const createRequest = await prisma.request.create({
    data: requestData,
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
          createdAt: true,
          updatedAt: true,
          userProfile: true,
        },
      },
    },
  });
  return createRequest;
};

const getMyRequests = async (user: TVerifyUSer) => {
  const result = await prisma.request.findMany({
    where: {
      requesterId: user?.id,
    },
    include: {
      // requester: {
      //   select: {
      //     id: true,
      //     name: true,
      //     email: true,
      //     bloodType: true,
      //     location: true,
      //     availability: true,
      //   },
      // },
      donor:{
        select:{
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
        }
      }
    },
    
  });

  return result;
};

const updateRequest = async (id: string,payload:any) => {
  await prisma.request.findUniqueOrThrow({
    where: { id: id },
  });
  const result=await prisma.request.update({
        where:{id},
        data:{ requestStatus:payload.status}
        
  })
  return result
};
export const requestServices = {
  donarRequest,
  getMyRequests,
  updateRequest,
};
