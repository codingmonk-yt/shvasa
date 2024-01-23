const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Import Routes
const agentRouter = require("./routes/agent");
const ticketRouter = require("./routes/ticket");

// Start express app
const app = express();

// GLOBAL MIDDLEWARES
// Implement CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shvasa.codingmonk.in",
      "https://www.shvasa.codingmonk.in",
    ],
  })
);

app.options("*", cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// ROUTES
app.use("/api/v1/agents", agentRouter);
app.use("/api/v1/tickets", ticketRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
