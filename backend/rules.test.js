const {
  createRule,
  combineRules,
  evaluateRule,
  extractFields,
} = require("./rules");

describe("createRule", () => {
  it("should create AST for a simple rule", () => {
    const ruleString = "age > 30";
    const ast = createRule(ruleString);
    expect(ast).toEqual({
      type: "operand",
      value: {
        key: "age",
        operator: ">",
        value: "30",
      },
      left: null,
      right: null,
    });
  });

  it("should handle parentheses correctly", () => {
    const ruleString = "(age > 30) AND (salary < 50000)";
    const ast = createRule(ruleString);
    expect(ast).toEqual({
      type: "operator",
      value: "AND",
      left: {
        type: "operand",
        value: {
          key: "age",
          operator: ">",
          value: "30",
        },
        left: null,
        right: null,
      },
      right: {
        type: "operand",
        value: {
          key: "salary",
          operator: "<",
          value: "50000",
        },
        left: null,
        right: null,
      },
    });
  });

  it("should throw an error for invalid rules", () => {
    expect(() => createRule("invalid rule")).toThrow(/Invalid rule/);
  });
});

// Test cases for combineRules
describe("combineRules", () => {
  it("should combine two rules with AND", () => {
    const rules = [{ rule: "age > 30" }, { rule: "salary < 50000" }];
    const { mergedString, ast } = combineRules(rules, "AND");
    expect(mergedString).toBe("(age > 30 AND salary < 50000)");
    expect(ast).toEqual({
      type: "operator",
      value: "AND",
      left: {
        type: "operand",
        value: {
          key: "age",
          operator: ">",
          value: "30",
        },
        left: null,
        right: null,
      },
      right: {
        type: "operand",
        value: {
          key: "salary",
          operator: "<",
          value: "50000",
        },
        left: null,
        right: null,
      },
    });
  });

  it("should combine multiple rules", () => {
    const rules = [
      { rule: "age > 30" },
      { rule: "salary < 50000" },
      { rule: "department == 'HR'" },
    ];
    const { mergedString, ast } = combineRules(rules, "OR");
    expect(mergedString).toBe(
      "((age > 30 OR salary < 50000) OR department == 'HR')"
    );
  });

  it("should handle empty rules array", () => {
    const { mergedString, ast } = combineRules([], "AND");
    expect(mergedString).toBe(undefined);
    expect(ast).toBe(undefined);
  });
});

describe("evaluateRule", () => {
  it("should evaluate a single rule correctly", () => {
    const node = createRule("age > 30");
    const data = { age: 31 };
    const result = evaluateRule(node, data);
    expect(result).toBe(true);
  });

  it("should evaluate combined rules correctly", () => {
    const node = createRule("(age > 30) AND (salary < 50000)");
    const data = { age: 31, salary: 40000 };
    const result = evaluateRule(node, data);
    expect(result).toBe(true);
  });

  it("should evaluate rules with OR correctly", () => {
    const node = createRule("(age > 30) OR (salary < 50000)");
    const data = { age: 25, salary: 40000 };
    const result = evaluateRule(node, data);
    expect(result).toBe(true);
  });

  it("should return false for mismatched conditions", () => {
    const node = createRule("age < 30");
    const data = { age: 31 };
    const result = evaluateRule(node, data);
    expect(result).toBe(false);
  });
});

// Test cases for extractFields
describe("extractFields", () => {
  it("should extract fields from an AST", () => {
    const node = createRule("age > 30");
    const fields = extractFields(node);
    expect(fields).toEqual(["age"]);
  });

  it("should extract multiple fields from combined rules", () => {
    const node = createRule("(age > 30) AND (salary < 50000)");
    const fields = extractFields(node);
    expect(fields).toEqual(["age", "salary"]);
  });

  it("should handle nested rules correctly", () => {
    const node = createRule(
      "(age > 30) OR (salary < 50000 AND department == 'HR')"
    );
    const fields = extractFields(node);
    expect(fields).toEqual(["age", "salary", "department"]);
  });
});
