const {
  createRule: createRuleAST,
  evaluateRule: evaluateAST,
} = require("../rules");
const db = require("../db");

exports.createRule = (ruleString, tag) => {
  const ast = createRuleAST(ruleString);
  const query = "INSERT INTO rules (rule_string, ast, tag) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.query(query, [ruleString, JSON.stringify(ast), tag], (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return reject(new Error(`Tag "${tag}" already exists.`));
        }
        return reject(err);
      }
      resolve({ id: results.insertId, ast });
    });
  });
};

exports.evaluateRule = async (tag, data) => {
  try {
    const rule = await this.getRuleByTag(tag);
    if (!rule) {
      throw new Error(`No rule found for tag: ${tag}`);
    }

    const result = evaluateAST(rule.ast, data);
    return result;
  } catch (error) {
    console.error("Error evaluating rule:", error);
    throw error;
  }
};

exports.getRuleByTag = (tag) => {
  const query = "SELECT * FROM rules WHERE tag = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [tag], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length) {
        const rule = results[0];
        let ast;
        try {
          ast = typeof rule.ast === "string" ? JSON.parse(rule.ast) : rule.ast; // Check if it's a string
        } catch (parseError) {
          console.error("Failed to parse AST:", parseError);
          return reject(new Error("Invalid AST format in the database."));
        }
        resolve({ ...rule, ast });
      } else {
        resolve(null);
      }
    });
  });
};

exports.getAllRules = () => {
  const query = "SELECT * FROM rules";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
exports.createCombinedRule = async (rulesArray, tag) => {
  const combinedRuleString = combineRules(rulesArray);
  return this.createRule(combinedRuleString, tag);
};
