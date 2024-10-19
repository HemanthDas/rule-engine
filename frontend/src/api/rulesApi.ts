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
  const response = await fetch("http://localhost:3000/api/rules", {
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
  const response = await fetch(`http://localhost:3000/api/rules/evaluate/`, {
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
  const response = await fetch("http://localhost:3000/api/rules/merge", {
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
