const express = require("express");
const router = express.Router();

const { getCredit } = require("../controllers/controllers");
const { updateAccount } = require("../controllers/controllers");
router.get("/account/:id/:money", getCredit)       
router.put("/accounts", updateAccount);

module.exports = router;