const express = require("express");
const router = express.Router();

const { getCredit } = require("../controllers/controllers");
const { updateAccount } = require("../controllers/controllers");
const { beginTrans } = require("../controllers/controllers");
const { commitTrans } = require("../controllers/controllers");
const { rollbackTrans } = require("../controllers/controllers");
router.get("/account/:id/:money", getCredit)       
router.put("/accounts", updateAccount);
router.post("/trans", beginTrans);
router.post("/commit", commitTrans);
router.post("/rollback", rollbackTrans);
module.exports = router;