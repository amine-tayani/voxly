import express, { Router } from "express";
import {
  createAccount,
  forgotPassword,
  loginIntoAccount,
  logout,
  resetPassword,
} from "../controllers/users";

const router: Router = express.Router();

router.post("/register", createAccount);
router.post("/login", loginIntoAccount);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
