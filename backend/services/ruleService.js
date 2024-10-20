const {
  createRule: createRuleAST,
  evaluateRule: evaluateAST,
  extractFields,
  combineRules,
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

exports.getFieldsFromRule = async (tag) => {
  const rule = await this.getRuleByTag(tag);
  if (!rule) {
    throw new Error(`No rule found for tag: ${tag}`);
  }

  const fields = extractFields(rule.ast);
  return fields;
};
exports.getRuleStringByTag = (tag) => {
  const query = "SELECT rule_string FROM rules WHERE tag = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [tag], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length) {
        resolve(results[0].rule_string);
      } else {
        resolve(null);
      }
    });
  });
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
          ast = typeof rule.ast === "string" ? JSON.parse(rule.ast) : rule.ast;
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
exports.createCombinedRule = async (rulesArray, tag, operator) => {
  const { mergedString, ast } = combineRules(rulesArray, operator);
  const query = "INSERT INTO rules (rule_string, ast, tag) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [mergedString, JSON.stringify(ast), tag],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return reject(new Error(`Tag "${tag}" already exists.`));
          }
          return reject(err);
        }
        resolve({ id: results.insertId, ast: ast });
      }
    );
  });
};
exports.deleteRule = (tag) => {
  const query = "DELETE FROM rules WHERE tag = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [tag], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows > 0);
    });
  });
};
exports.updateRule = (tag, ruleString) => {
  const ast = createRuleAST(ruleString);
  const query = "UPDATE rules SET rule_string = ?, ast = ? WHERE tag = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [ruleString, JSON.stringify(ast), tag], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows > 0);
    });
  });
};
