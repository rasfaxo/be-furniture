import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import ClientError from "./utils/exceptions/ClientError";
import router from "./api/routers";
import rateLimit from "express-rate-limit/dist";

export const app = express();

// MIDDLEWARE
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.set("trust proxy", false);
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// ROUTES
router(app);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// 404 NOT FOUND
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Halamat Tidak di Temukan!",
  });
});

// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 15 }));

// HANDLE ERRORS
app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      status: false,
      message: error.message,
    });
  } else if (error instanceof Error) {
    res.status(500).json({
      status: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  } else {
    next();
  }
});

export default app;
