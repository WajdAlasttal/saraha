import { Router } from "express";
import * as userController from './controller/User.controller.js';
import { auth } from "../../../Middleware/auth.middleware.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { HME } from "../../Services/multer.js";
const router = Router();
router.get('/profile',auth,asyncHandler(userController.profile));
router.patch('/profilePic',auth,fileUpload().single('image'),HME,userController.profilePic)
export default router;