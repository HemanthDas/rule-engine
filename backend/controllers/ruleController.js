const ruleService = require("../services/ruleService");

exports.createRule = async (req, res) => {
  const { ruleString, tag } = req.body;

  try {
    const ast = await ruleService.createRule(ruleString, tag);
    res.status(201).json({ ast });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.evaluateRule = async (req, res) => {
  const { tag, data } = req.body;

  try {
    const rule = await ruleService.getRuleByTag(tag);
    if (!rule) {
      return res.status(404).json({ error: `No rule found for tag: ${tag}` });
    }

    const result = await ruleService.evaluateRule(tag, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
