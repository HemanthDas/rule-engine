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
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
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
