import { useMemo, useState } from "react";
import CreateRule from "./components/CreateRule";
import ValidateRule from "./components/ValidateRule";
import MergeRule from "./components/MergeRule";
import Rules from "./components/Rules";

function App() {
  const [page, setPage] = useState("");
  const [result, setResult] = useState("");
  const setFetchResult = (value: string) => {
    setResult(value);
  };
  const ComponentLoad = useMemo(() => {
    setResult("");
    switch (page) {
      case "create":
        return <CreateRule setFetchResult={setFetchResult} />;
      case "validate":
        return <ValidateRule setFetchResult={setFetchResult} />;
      case "merge":
        return <MergeRule setFetchResult={setFetchResult} />;
      case "rule":
        return <Rules />;
      default:
        return (
          <h1 className="font-extrabold text-3xl">RULE ENGINE WITH AST</h1>
        );
    }
  }, [page]);

  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center flex-col p-4 min-h-fit">
      <h1 className="font-sans text-2xl mb-4">WELCOME...!</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => {
            setPage("create");
          }}
        >
          Create Rule
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => {
            setPage("merge");
          }}
        >
          Merge Rule
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setPage("validate");
          }}
        >
          Validate Rule
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => {
            setPage("rule");
          }}
        >
          Rules
        </button>
      </div>
      <div className="w-full flex justify-center">{ComponentLoad}</div>
      <div className="max-w-lg w-full mt-2">
        <textarea
          className="p-4 rounded border border-gray-300 text-black w-full h-fit bg-white"
          disabled
          style={result ? { display: "block" } : { display: "none" }}
          rows={10}
          value={result}
        />
      </div>
    </div>
  );
}

export default App;
