const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authMiddleware = require("../middlewares/authMiddleware"); // assumes JWT auth

// Protect all routes
router.use(authMiddleware);

router.post("/", authorizeRoles("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.createPatient);
router.get("/", authorizeRoles("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.getPatients);
router.get("/:id", authorizeRoles("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.getPatientById);
router.put("/:id", authorizeRoles("ADMIN", "DOCTOR"), patientController.updatePatient);
router.delete("/:id", authorizeRoles("ADMIN"), patientController.deletePatient);

module.exports = router;
