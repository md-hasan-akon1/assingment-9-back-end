import { z } from "zod"

export type TDonarRequest ={
        donorId: string
        phoneNumber: string
        bloodType:string
        dateOfDonation: string
        hospitalName: string
        hospitalAddress: string
        reason: string
      }
export type TVerifyUSer= {
        name: string
        email: string
        id: string
        iat: number
        exp: number
      }


export const UserSchema = z.object({
    name: z.string({required_error:'name is required'}),
    email: z.string({required_error:'email is required'}).email(),
    password: z.string({required_error:'password is required'}),
    bloodType: z.string({required_error:'bloodType is required'}),
    location: z.string({required_error:'location is required'}),
    age: z.number({required_error:'age is required'}).int().min(0), 
    bio: z.string({required_error:'bio is required'}),
    lastDonationDate: z.string({required_error:'last donation date is required'}),
    
  });