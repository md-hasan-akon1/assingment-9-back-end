"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }),
    email: zod_1.z.string({ required_error: 'email is required' }).email(),
    password: zod_1.z.string({ required_error: 'password is required' }),
    bloodType: zod_1.z.string({ required_error: 'bloodType is required' }),
    location: zod_1.z.string({ required_error: 'location is required' }),
    age: zod_1.z.number({ required_error: 'age is required' }).int().min(0),
    bio: zod_1.z.string({ required_error: 'bio is required' }),
    lastDonationDate: zod_1.z.string({ required_error: 'last donation date is required' }),
});
