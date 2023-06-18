import { Router } from "express";
import * as authController from './controller/Auth.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import validation from "../../../Middleware/validation.js";
import * as validator from "./Auth.validation.js";
const router = Router();

router.post('/signup',validation(validator.signupSchema),asyncHandler(authController.signup));
router.post('/login',validation(validator.loginSchema),asyncHandler(authController.login));
router.get('/confirmEmail/:token',authController.confirmEmail)

export default router;