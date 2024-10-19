class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
function extractFields(node) {
  const fields = new Set();

  function traverse(node) {
    if (node.type === "operand") {
      fields.add(node.value.key);
    } else if (node.type === "operator") {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
  }

  traverse(node);
  return Array.from(fields);
}
function createRule(ruleString) {
  const operators = ["AND", "OR"];

  function trimUnnecessaryParentheses(str) {
    str = str.trim();
    while (str.startsWith("(") && str.endsWith(")")) {
      const inner = str.slice(1, -1).trim();
      if (isBalanced(inner)) str = inner;
      else break;
    }
    return str;
  }

  function isBalanced(str) {
    let depth = 0;
    for (let char of str) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (depth < 0) return false;
    }
    return depth === 0;
  }

  function findTopLevelOperator(rule) {
    let depth = 0;
    let operatorIndex = -1;
    let selectedOperator = null;

    for (let i = 0; i < rule.length; i++) {
      if (rule[i] === "(") depth++;
      if (rule[i] === ")") depth--;

      if (depth === 0) {
        for (let operator of operators) {
          if (rule.slice(i, i + operator.length) === operator) {
            selectedOperator = operator;
            operatorIndex = i;
            break;
          }
        }
      }
    }
    return { selectedOperator, operatorIndex };
  }

  function buildAST(rule) {
    rule = trimUnnecessaryParentheses(rule);

    const { selectedOperator, operatorIndex } = findTopLevelOperator(rule);

    if (selectedOperator !== null) {
      const left = rule.slice(0, operatorIndex).trim();
      const right = rule.slice(operatorIndex + selectedOperator.length).trim();

      return new Node(
        "operator",
        selectedOperator,
        buildAST(left),
        buildAST(right)
      );
    }

    const match = rule.match(/(\w+)\s*([<>!=]+|=)\s*'?(.*?)'?$/);
    if (match) {
      const [_, key, operator, value] = match;
      const finalOperator = operator === "=" ? "==" : operator;

      return new Node("operand", { key, operator: finalOperator, value });
    }

    throw new Error(`Invalid rule: "${rule}"`);
  }

  const ast = buildAST(ruleString);
  return ast;
}
function combineRules(rules, operator) {
  if (rules.length === 0) return "";
  if (rules.length === 1) return rules[0].rule;

  let mergedString = rules[0].rule;

  for (let i = 1; i < rules.length; i++) {
    mergedString = `(${mergedString} ${operator} ${rules[i].rule})`;
  }
  const ast = createRule(mergedString);
  console.log(mergedString);
  return { mergedString, ast };
}

function evaluateRule(node, data) {
  if (node.type === "operand") {
    const { key, operator, value } = node.value;

    switch (operator) {
      case ">":
        return data[key] > parseFloat(value);
      case "<":
        return data[key] < parseFloat(value);
      case "==":
        return data[key] == value;
      case "!=":
        return data[key] != value;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }

  if (node.type === "operator") {
    const leftEval = evaluateRule(node.left, data);
    const rightEval = evaluateRule(node.right, data);

    return node.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
  }

  throw new Error(`Unknown node type: "${node.type}"`);
}

module.exports = { createRule, evaluateRule, extractFields, combineRules };
