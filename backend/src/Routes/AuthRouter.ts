import { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../Middlewares/AuthValidation";
import { login, signup } from "../Controllers/AuthController";

const router = Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
