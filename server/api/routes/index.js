const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const branchRoutes = require("./branch.route");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/docs", express.static("docs"));

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/branch", branchRoutes);

module.exports = router;
