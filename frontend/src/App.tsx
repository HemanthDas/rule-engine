import { useMemo, useState } from "react";
import CreateRule from "./components/CreateRule";
import ValidateRule from "./components/ValidateRule";

function App() {
  const [page, setPage] = useState("");
  const ComponentLoad = useMemo(() => {
    switch (page) {
      case "create":
        return <CreateRule />;
      case "validate":
        return <ValidateRule />;
      default:
        return <></>;
    }
  }, [page]);

  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center flex-col p-4">
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setPage("validate");
          }}
        >
          Validate Rule
        </button>
      </div>
      <div className="w-full flex justify-center">{ComponentLoad}</div>
    </div>
  );
}

export default App;
