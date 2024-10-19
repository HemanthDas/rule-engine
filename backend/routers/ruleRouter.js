const express = require("express");
const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.post("/create_rule", ruleController.createRule);

router.post("/evaluate_rule", ruleController.evaluateRule);

router.get("/fields/:tag", ruleController.getFieldsFromRule);

router.post("/combine_rules", ruleController.mergeRules);

router.get("/:tag", ruleController.getRuleByTag);

router.delete("/:tag", ruleController.deleteRule);

router.put("/:tag", ruleController.updateRule);

module.exports = router;
