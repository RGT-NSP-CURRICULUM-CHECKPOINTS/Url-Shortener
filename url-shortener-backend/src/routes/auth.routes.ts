import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rate limiter for login attempts: 5 attempts per 15 minutes
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Rate limiter for registration attempts: 3 attempts per 15 minutes
const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: {
    message: "Too many registration attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Register a new user with rate limiting
router.post("/register", registerRateLimiter, AuthController.register);
// Login a user with rate limiting
router.post("/login", loginRateLimiter, AuthController.login);

export default router;
