import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import redirectRoutes from "./routes/redirect.routes";
import rateLimit from "express-rate-limit";

const app = express();
// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

// Global middleware
app.use(express.json());

// JSON parsing error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof SyntaxError && "body" in err) {
      return res.status(400).json({ message: "Invalid JSON" });
    }
    next(err);
  }
);
// Apply rate limiting to all requests
app.use(limiter);
// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// Mount auth routes
app.use("/api/auth", authRoutes);

import urlRoutes from "./routes/url.routes";

app.use("/api", urlRoutes);

app.use("/", redirectRoutes);

export default app;
