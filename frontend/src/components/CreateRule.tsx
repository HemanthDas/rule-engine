import { useState } from "react";
import { createRule } from "../api/rulesApi";

const CreateRule = () => {
  const [tag, setTag] = useState("");
  const [rule, setRule] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createRule(tag, rule);
    alert(response.message);
  };

  return (
    <div className="p-5 max-w-lg mx-auto border border-gray-300 rounded-lg w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <label className="font-bold">Tag for the Rule</label>
        <input
          type="text"
          required
          className="p-2 rounded border border-gray-300 text-black font-bold"
          onChange={(e) => setTag(e.target.value)}
        />
        <label className="font-bold">Provide Rule String</label>
        <textarea
          required
          className="p-2 rounded border border-gray-300 text-black"
          onChange={(e) => setRule(e.target.value)}
          rows={5}
        />
        <button
          type="submit"
          className="p-2.5 rounded border-none bg-blue-500 text-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRule;
