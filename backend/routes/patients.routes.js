const express = require("express");
const router = express.Router();
const patientController = require("../controller/patients.controller");
const { checkRole } = require("../middleware/rbac");
const { auth } = require("../middleware/auth");


router.use(auth);

router.post("/", checkRole("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.createPatients);
router.get("/", checkRole("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.getPatients);
router.get("/:id", checkRole("ADMIN", "DOCTOR", "RECEPTIONIST"), patientController.getPatientsById);
router.put("/:id", checkRole("ADMIN", "DOCTOR"), patientController.updatePatient);
router.delete("/:id", checkRole("ADMIN"), patientController.deletePatient);

module.exports = router;
