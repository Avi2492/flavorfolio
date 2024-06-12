import express from "express";
import {
  getMe,
  logout,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;
