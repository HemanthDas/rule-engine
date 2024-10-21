import { useState } from "react";
import { fetchRuleByTag, deleteRule, updateRule } from "../api/rulesApi"; // Import your API functions

const Rules = () => {
  const [tag, setTag] = useState("");
  const [rule, setRule] = useState<any>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [updatedRule, setUpdatedRule] = useState(""); // State for the updated rule string

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const fetchedRule = await fetchRuleByTag(tag);
      setRule(fetchedRule);
      setUpdatedRule(fetchedRule.rule); // Populate with the existing rule string
      setError("");
      setIsEditing(false); // Reset edit mode when searching
    } catch (err) {
      setError((err as Error).message);
      setRule(null);
    }
  };

  const handleUpdate = async () => {
    if (rule) {
      try {
        const res = await updateRule(tag, updatedRule);
        console.log(res);
        setRule(res.ruleString);
        setIsEditing(false);
        setError("");
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this rule?"
    );
    if (!isConfirmed) {
      return;
    }
    if (rule) {
      try {
        await deleteRule(tag);
        setRule(null);
        setTag("");
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
    console.log(rule);
    setUpdatedRule(rule?.rule_string);
  };

  return (
    <div className="p-5 max-w-lg mx-auto border border-gray-300 rounded-lg w-full">
      <h1 className="text-xl font-bold mb-4">Rules</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-2.5">
        <label className="font-bold">Search by Tag</label>
        <input
          type="text"
          placeholder="Enter tag to search"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 text-black"
        />
        <button
          type="submit"
          className="p-2.5 rounded border-none bg-blue-500 text-white cursor-pointer"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {rule && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Rule Details</h2>
          {isEditing ? (
            <div>
              <textarea
                value={updatedRule}
                onChange={(e) => setUpdatedRule(e.target.value)} // Update state with new rule string
                className="bg-gray-100 p-2 rounded border border-gray-300 text-black w-full"
                rows={5}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleUpdate}
                  className="p-2 rounded border-none bg-green-500 text-white cursor-pointer"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded border-none bg-gray-500 text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <pre className="bg-gray-100 p-2 rounded border border-gray-300 text-black text-wrap">
                {JSON.stringify(rule.rule, null, 2)}
              </pre>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditing(true); // Set editing mode
                  }}
                  className="p-2 rounded border-none bg-yellow-500 text-white cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded border-none bg-red-500 text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Rules;
