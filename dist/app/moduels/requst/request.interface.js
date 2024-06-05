"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationRequestSchema = void 0;
const zod_1 = require("zod");
exports.DonationRequestSchema = zod_1.z.object({
    donorId: zod_1.z.string({ required_error: 'donorId is required' }),
    phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
    dateOfDonation: zod_1.z.string({ required_error: 'date of donation is required' }),
    hospitalName: zod_1.z.string({ required_error: 'hospital name is required' }),
    hospitalAddress: zod_1.z.string({ required_error: 'hospital address is required' }),
    reason: zod_1.z.string({ required_error: 'reason is required' })
});
