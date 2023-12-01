import express, { Router } from "express";
import { getCurrentUser } from "../controllers/users";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.get("/me", auth, getCurrentUser);

export default router;
