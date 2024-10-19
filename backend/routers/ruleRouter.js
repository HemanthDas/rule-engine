const express = require("express");
const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.post("/", ruleController.createRule);

router.post("/evaluate", ruleController.evaluateRule);

router.get("/fields/:tag", ruleController.getFieldsFromRule);
module.exports = router;
