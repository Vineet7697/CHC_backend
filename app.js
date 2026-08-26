const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth.routes");
const patientRoutes = require("./src/routes/patient.routes");
const adminRoutes = require("./src/routes/admin.routes");
const doctorRoutes = require("./src/routes/doctor.routes");
const clinicRoutes = require("./src/routes/clinic.routes");

const app = express();

// ======================================================
// CORS
// ======================================================

const corsOptions = {
  origin: "https://chc-frontend-mauve.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicit preflight handling
app.options("*", cors(corsOptions));

// ======================================================
// GLOBAL MIDDLEWARE
// ======================================================

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Yo Doctor API is running",
  });
});

// ======================================================
// API ROUTES
// ======================================================

app.use("/auth", authRoutes);

app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/clinic", clinicRoutes);

app.use("/admin", adminRoutes);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
