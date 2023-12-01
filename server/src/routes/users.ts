import express, { Router } from "express";
import {
  checkIftokenIsValid,
  createAccount,
  forgotPassword,
  getUser,
  loginIntoAccount,
  logout,
  resetPassword,
} from "../controllers/users";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.post("/register", createAccount);
router.post("/login", loginIntoAccount);
router.post("/logout", logout);
router.post("/tokenIsValid", checkIftokenIsValid);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/", auth, getUser);

export default router;
