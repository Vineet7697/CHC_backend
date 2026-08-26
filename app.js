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
// GLOBAL MIDDLEWARE
// ======================================================

app.use(helmet());

app.use(
  cors({
    origin: "*",
  })
);

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

// Authentication
// /auth/*
app.use("/auth", authRoutes);

// Patient
// /patient/*
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/clinic", clinicRoutes);

// Admin
// /admin/*
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