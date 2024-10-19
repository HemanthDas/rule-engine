class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type; // "operator" or "operand"
    this.value = value; // Operator or Operand { key, operator, value }
    this.left = left;
    this.right = right;
  }
}

function parseRule(ruleString) {
  const operators = ["AND", "OR"];

  // Helper to trim outer parentheses recursively
  function trimUnnecessaryParentheses(str) {
    str = str.trim();
    while (str.startsWith("(") && str.endsWith(")")) {
      const inner = str.slice(1, -1).trim();
      if (isBalanced(inner)) str = inner;
      else break; // Stop if inner parentheses are not balanced
    }
    return str;
  }

  // Helper to check if parentheses are balanced
  function isBalanced(str) {
    let depth = 0;
    for (let char of str) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (depth < 0) return false; // Unbalanced
    }
    return depth === 0;
  }

  // Function to find the top-level operator at depth 0
  function findTopLevelOperator(rule) {
    let depth = 0;
    let operatorIndex = -1;
    let selectedOperator = null;

    for (let i = 0; i < rule.length; i++) {
      if (rule[i] === "(") depth++;
      if (rule[i] === ")") depth--;

      // Only check for operators at depth 0
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

  // Recursive function to build the AST
  function buildAST(rule) {
    rule = trimUnnecessaryParentheses(rule);
    console.log(`Parsing rule: "${rule}"`);

    const { selectedOperator, operatorIndex } = findTopLevelOperator(rule);

    // If a top-level operator is found, split into left and right parts
    if (selectedOperator !== null) {
      const left = rule.slice(0, operatorIndex).trim();
      const right = rule.slice(operatorIndex + selectedOperator.length).trim();
      console.log(
        `Root Operator: "${selectedOperator}" | Left: "${left}", Right: "${right}"`
      );

      return new Node(
        "operator",
        selectedOperator,
        buildAST(left),
        buildAST(right)
      );
    }

    // Handle individual operands (conditions)
    const match = rule.match(/(\w+)\s*([<>!=]+|=)\s*'?(.*?)'?$/);
    if (match) {
      const [_, key, operator, value] = match;
      const finalOperator = operator === "=" ? "==" : operator;
      console.log(
        `Parsed operand: key="${key}", operator="${finalOperator}", value="${value}"`
      );

      return new Node("operand", { key, operator: finalOperator, value });
    }

    throw new Error(`Invalid rule: "${rule}"`);
  }

  return buildAST(ruleString);
}

function evaluateRule(node, userData) {
  if (node.type === "operand") {
    const { key, operator, value } = node.value;
    const userValue = userData[key];
    console.log(
      `Evaluating operand: ${key} ${operator} ${value} | User Value: ${userValue}`
    );

    switch (operator) {
      case ">":
        return userValue > value;
      case "<":
        return userValue < value;
      case "==":
        return userValue == value;
      case "!=":
        return userValue != value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  if (node.type === "operator") {
    console.log(`Evaluating operator: "${node.value}"`);
    const leftEval = evaluateRule(node.left, userData);
    const rightEval = evaluateRule(node.right, userData);
    console.log(
      `Left Eval: ${leftEval}, Right Eval: ${rightEval} | Operator: ${node.value}`
    );

    return node.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
  }

  throw new Error(`Unknown node type: "${node.type}"`);
}

// Test the parsing and evaluation of the rule
// const ruleString =
//   "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";
// const ast = parseRule(ruleString);

// console.log("AST Representation:", JSON.stringify(ast, null, 2));

// // Test cases
// const testCases = [
//   {
//     userData: {
//       age: 35,
//       department: "Marketing",
//       salary: 30000,
//       experience: 4,
//     },
//     expected: true,
//   },
//   {
//     userData: {
//       age: 28,
//       department: "Marketing",
//       salary: 25000,
//       experience: 4,
//     },
//     expected: false,
//   },
//   {
//     userData: {
//       age: 40,
//       department: "Marketing",
//       salary: 15000,
//       experience: 6,
//     },
//     expected: true,
//   },
//   {
//     userData: { age: 32, department: "Sales", salary: 30000, experience: 6 },
//     expected: false,
//   },
//   {
//     userData: {
//       age: 33,
//       department: "Marketing",
//       salary: 18000,
//       experience: 2,
//     },
//     expected: false,
//   },
//   {
//     userData: {
//       age: 50,
//       department: "Marketing",
//       salary: 25000,
//       experience: 3,
//     },
//     expected: true,
//   },
// ];

// // Run test cases
// testCases.forEach(({ userData, expected }, index) => {
//   const result = evaluateRule(ast, userData);
//   console.log(
//     `Test Case ${index + 1}: ${result === expected ? "Passed ✅" : "Failed ❌"}`
//   );
//   console.log("User Data:", userData);
//   console.log("Expected:", expected, "| Result:", result);
//   console.log("---");
// });

const ruleString =
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const ast = parseRule(ruleString);

console.log("AST Representation:", JSON.stringify(ast, null, 2));

// Define test cases
const testCases = [
  {
    userData: { age: 39, department: "Sales", salary: 40000, experience: 6 },
    expected: true,
  },
  {
    userData: {
      age: 22,
      department: "Marketing",
      salary: 30000,
      experience: 4,
    },
    expected: false,
  },
  {
    userData: {
      age: 24,
      department: "Marketing",
      salary: 60000,
      experience: 3,
    },
    expected: true,
  },
  {
    userData: {
      age: 31,
      department: "Engineering",
      salary: 70000,
      experience: 4,
    },
    expected: false,
  },
  {
    userData: {
      age: 29,
      department: "Marketing",
      salary: 60000,
      experience: 7,
    },
    expected: false,
  },
];

// Run the test cases
testCases.forEach(({ userData, expected }, index) => {
  const result = evaluateRule(ast, userData);
  console.log(
    `Test Case ${index + 1}:`,
    result === expected ? "Passed ✅" : "Failed ❌"
  );
  console.log("User Data:", userData);
  console.log("Expected:", expected, "| Result:", result);
  console.log("---");
});
