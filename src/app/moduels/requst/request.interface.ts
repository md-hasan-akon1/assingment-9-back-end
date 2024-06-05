import { z } from "zod";

export const DonationRequestSchema = z.object({
        donorId: z.string({required_error:'donorId is required'}),
        phoneNumber: z.string({required_error:'phoneNumber is required'}),
        dateOfDonation: z.string({required_error:'date of donation is required'}),
        hospitalName: z.string({required_error:'hospital name is required'}),
        hospitalAddress: z.string({required_error:'hospital address is required'}),
        reason: z.string({required_error:'reason is required'})
    });