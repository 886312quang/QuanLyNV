const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const branchRoutes = require("./branch.route");
const staffRoutes = require("./staff.route");
const serviceRoutes = require("./service.route");
const noteRoutes = require("./note.route");
const shiftRoutes = require("./shift.route");
const ledgerRoutes = require("./ledger.route");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/docs", express.static("docs"));

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/branch", branchRoutes);
router.use("/staff", staffRoutes);
router.use("/service", serviceRoutes);
router.use("/note", noteRoutes);
router.use("/shift", shiftRoutes);
router.use("/ledger", ledgerRoutes);

module.exports = router;
