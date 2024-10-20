export const getFields = async (ruleTag: string) => {
  const response = await fetch(
    `http://localhost:3000/api/rules/fields/${ruleTag}`
  );
  if (response.status == 404) {
    return { fields: [], error: "Rule not found" };
  }
  return response.json();
};
export const createRule = async (ruletag: string, rule: string) => {
  const response = await fetch("http://localhost:3000/api/rules/create_rule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag: ruletag,
      ruleString: rule,
    }),
  });
  if (response.status == 400) {
    return await response.json();
  }
  if (response.ok) {
    return {
      message: "Rule created successfully",
      res: await response.json(),
    };
  }
  return { message: "Error creating rule" };
};

export const validateRule = async (ruleTag: string, fieldValues: any) => {
  const response = await fetch(`http://localhost:3000/api/rules/evaluate_rule/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag: ruleTag,
      data: fieldValues,
    }),
  });

  return response.json();
};
export const mergeRules = async (
  rules: { rule: string }[],
  operator: string,
  tag: string
) => {
  const response = await fetch("http://localhost:3000/api/rules/combine_rules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rules,
      operator,
      tag,
    }),
  });

  if (response.ok) {
    return { message: "Rules merged successfully", res: await response.json() };
  }
  return await response.json();
};

export const fetchRuleByTag = async (tag: string) => {
  const response = await fetch(`http://localhost:3000/api/rules/${tag}`);
  if (response.status == 404) {
    throw new Error("Rule not found");
  }
  return response.json();
};

export const deleteRule = async (tag: string) => {
  const response = await fetch(`http://localhost:3000/api/rules/${tag}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting rule");
  }
};

export const updateRule = async (tag: string, rule: string) => {
  const response = await fetch(`http://localhost:3000/api/rules/${tag}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag,
      ruleString: rule,
    }),
  });
  if (response.status == 404) {
    throw new Error("Rule not found");
  }
  return { tag, ruleString: rule };
};
