"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../sheared/prisma"));
const argon2_1 = __importDefault(require("argon2"));
const user_constant_1 = require("./user.constant");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //password hasign
    const hashPass = yield argon2_1.default.hash(data.password);
    const userData = {
        name: data.name,
        email: data.email,
        password: hashPass,
        bloodType: data.bloodType,
        location: data.location,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        //create user use by transaction
        const createUser = yield tx.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                bloodType: true,
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
        const userProfile = yield tx.userProfile.create({
            data: profileData,
        });
        return Object.assign(Object.assign({}, createUser), { userProfile });
    }));
    return result;
});
const getUserFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const andCondition = [];
    const { searchTerm, page = 1, limit = 10, sortBy = "name", sortOrder = "desc", bloodType, availability, } = req.query;
    const filterData = {};
    if (bloodType) {
        filterData.bloodType = bloodType;
    }
    if (availability) {
        filterData.availability =
            req.query.availability === "true" ? true : false;
    }
    if (searchTerm) {
        andCondition.push({
            OR: user_constant_1.searchFiled.map((filed) => ({
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
                    equals: typeof filterData[key] === "string"
                        ? filterData[key]
                        : filterData[key],
                    mode: typeof filterData[key] === "string"
                        ? client_1.Prisma.QueryMode.insensitive
                        : undefined,
                },
            })),
        });
    }
    const result = yield prisma_1.default.user.findMany({
        where: { AND: andCondition },
        skip: Number(Number(page - 1) * Number(limit)),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder,
        },
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
    });
    const total = yield prisma_1.default.user.count({
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
});
exports.userServices = {
    createUser,
    getUserFromDB,
};
