import React, { useState } from "react";
import { mergeRules } from "../api/rulesApi";
interface ResultsProps {
  setFetchResult: (value: string) => void;
}
const MergeRule = ({ setFetchResult }: ResultsProps) => {
  const [rules, setRules] = useState([{ rule: "" }]);
  const [operator, setOperator] = useState("OR");
  const [tag, setTag] = useState("");

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index].rule = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { rule: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await mergeRules(rules, operator, tag);
      if (response.error) {
        alert(response.error);
        return;
      }
      alert(`Merge successful: ${response.message}`);

      setFetchResult(JSON.stringify(response.res.merged.ast, null, 2));
    } catch (error) {
      console.error("Error merging rules:", error);
      alert("Error merging rules. Please check the console for more details.");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto border border-gray-300 rounded-lg w-full">
      <h1 className="text-xl font-bold mb-4 text-center">Merge Rule</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {rules.map((rule, index) => (
          <div key={index} className="flex flex-col">
            <label className="font-bold">Rule {index + 1}:</label>
            <input
              type="text"
              value={rule.rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              required
              className="p-2 rounded border border-gray-300 text-black"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addRule}
          className="p-2.5 rounded border-none bg-green-500 text-white cursor-pointer mb-2"
        >
          Add Rule
        </button>
        <div className="flex flex-col">
          <label className="font-bold">Operator:</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 text-black"
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Tag:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 text-black"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 rounded border-none bg-blue-500 text-white cursor-pointer mt-4"
        >
          Merge Rules
        </button>
      </form>
    </div>
  );
};

export default MergeRule;
