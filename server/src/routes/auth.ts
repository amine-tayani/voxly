import express, { Router } from "express";
import {
  checkIftokenIsValid,
  createAccount,
  forgotPassword,
  loginIntoAccount,
  logout,
  passwordReset,
} from "../controllers/auth";

const router: Router = express.Router();

router.post("/register", createAccount);
router.post("/login", loginIntoAccount);
router.post("/logout", logout);
router.post("/validate-token", checkIftokenIsValid);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", passwordReset);

export default router;
