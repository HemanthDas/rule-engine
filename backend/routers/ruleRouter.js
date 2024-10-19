const express = require("express");
const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.post("/", ruleController.createRule);

router.post("/evaluate", ruleController.evaluateRule);

router.get("/fields/:tag", ruleController.getFieldsFromRule);

router.post("/merge", ruleController.mergeRules);
module.exports = router;
