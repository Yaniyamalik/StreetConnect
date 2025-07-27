import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    getUserProfile
    
} from "../controllers/userController.js";
import {upload} from "../middleware/multer.model.js"
import  {verifyJWT}  from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";


const router = Router()

router.route("/signup").post(
    registerUser
);


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.get("/profile", verifyJWT, getUserProfile);

export default router