import { Prisma, User } from "@prisma/client";
import prisma from "../../sheared/prisma";
import argon2 from "argon2";
import { searchFiled } from "./user.constant";
const createUser = async (data: any) => {
  //password hasign
  const hashPass = await argon2.hash(data.password);
  const userData = {
    name: data.name,
    email: data.email,
    phoneNumber:data.phoneNumber,
    password: hashPass,
    bloodType: data.bloodType,
    location: data.location,
  };
  const result = await prisma.$transaction(async (tx) => {
    //create user use by transaction
    const createUser = await tx.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        phoneNumber:true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    //create profile use by transaction
    const profileData = {
      userId: createUser.id,
      bio: data.bio,
      age: data.age,
      lastDonationDate: data.lastDonationDate,
    };
    const userProfile = await tx.userProfile.create({
      data: profileData,
    });
    return { ...createUser, userProfile };
  });
  return result;
};

const getUserFromDB = async (req: any) => {
  const andCondition: Prisma.UserWhereInput[] = [];

  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortBy = "lastDonationDate",
    sortOrder = "desc",
    bloodType,
    availability,
  } = req.query;
  const filterData: any = {};
  if (bloodType) {
    filterData.bloodType = bloodType;
  }
  if (availability) {
    filterData.availability =
      (req.query.availability as string) === "true" ? true : false;
  }

  if (searchTerm) {
    andCondition.push({
      OR: searchFiled.map((filed) => ({
        [filed]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals:
            typeof (filterData as any)[key] === "string"
              ? (filterData as any)[key]
              : (filterData as any)[key],
          mode:
            typeof (filterData as any)[key] === "string"
              ? Prisma.QueryMode.insensitive
              : undefined,
        },
      })),
    });
  }
 
  let orderBy;
 if(sortBy){
  if (sortBy === 'lastDonationDate') {
    orderBy = { userProfile: { lastDonationDate: sortOrder } };
  } else if (sortBy === 'name') {
    orderBy = { name: sortOrder };
  } else if (sortBy === 'age') {
    orderBy = { userProfile: { age: sortOrder } };
  } else {
    throw new Error('Invalid sort field');
  }
 }
  const result = await prisma.user.findMany({
    where: { AND: andCondition },
    skip: Number(Number(page - 1) * Number(limit)),
    take: Number(limit),
    orderBy ,

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
  const total = await prisma.user.count({
    where: { AND: andCondition },
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};



const getSingleUser = async (id: any) => {
  console.log(id);
  const result= await prisma.user.findUniqueOrThrow({
    where:{id},
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
  })
 
  return result;
};

export const userServices = {
  createUser,
  getSingleUser,
  getUserFromDB,
  
};
