import { useState } from "react";

const CreateRule = () => {
  const [tag, setTag] = useState("");
  const [rule, setRule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(tag, rule);
  };

  return (
    <div className="p-5 max-w-lg mx-auto border border-gray-300 rounded-lg w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <label className="font-bold">Tag for the Rule</label>
        <input
          type="text"
          required
          className="p-2 rounded border border-gray-300 text-black"
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
