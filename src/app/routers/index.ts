
import express from "express"
import { userRouter } from "../moduels/User/User.routes"
import { authRoute } from "../moduels/Auth/auth.route";
import { requestRouter } from "../moduels/requst/request.route";
import { userProfileRouter } from "../moduels/userProfile/userProfile.routes";

export const router=express.Router()
const modules=[
        {
                path:'/',
                route:userRouter
        },
        {
                path:'/',
                route:authRoute
        },
        {
                path:'/',
                route:requestRouter
        },
        {
                path:'/',
                route:userProfileRouter
        },
]

modules.forEach(element => {
   router.use(element.path,element.route)     
});