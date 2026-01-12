import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Auth-specific rate limiter (stricter limits for brute force protection)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Only 5 login/register attempts per hour per IP
  message: {
    success: false,
    message:
      "Too many login attempts from this IP, please try again after an hour.",
  },
});

// Register a new user
router.post("/register", authLimiter, AuthController.register);

// Login a user
router.post("/login", authLimiter, AuthController.login);

export default router;
