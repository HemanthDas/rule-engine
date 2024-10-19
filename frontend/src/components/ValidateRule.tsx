import { useState } from "react";
import { getFields, validateRule } from "../api/rulesApi";
interface ResultsProps {
  setFetchResult: (value: string) => void;
}
const ValidateRule = ({ setFetchResult }: ResultsProps) => {
  // State to store the rule tag entered by the user
  const [ruleTag, setRuleTag] = useState("");
  // State to manage loading state while fetching fields
  const [isFieldsLoading, setIsFieldsLoading] = useState(false);
  // State to store the fields fetched from the API
  const [fields, setFields] = useState([]);
  // State to store the values entered for each field
  const [fieldValues, setFieldValues] = useState({});
  // State to check if fields are available
  const [isFieldsAvailable, setIsFieldsAvailable] = useState(false);
  // State to manage notification messages
  const [notification, setNotification] = useState("");

  // Handler for submitting the rule tag form
  const onRuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFieldsLoading(true);

    // Fetch fields based on the rule tag
    const res = await getFields(ruleTag);
    setFetchResult(res.rule.rule_string);
    setIsFieldsLoading(false);

    if (res.error) {
      setFields([]);
      setIsFieldsAvailable(false);
      alert(res.error);
      return;
    }

    setIsFieldsAvailable(true);
    setFields(res.fields);
    setFieldValues({});
  };

  // Handler for changing field values
  const onFieldChange = (field: string, value: string) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handler for submitting the fields form
  const onSubmitFields = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await validateRule(ruleTag, fieldValues);
    console.log(response.result);
    setNotification(response.result ? "Rule is valid" : "Rule is invalid");
    setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Rule Validation
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <form className="flex-1 flex flex-col gap-4" onSubmit={onRuleSubmit}>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Enter the Rule Tag
          </label>
          <input
            type="text"
            required
            className="p-3 rounded border border-gray-300 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setRuleTag(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Submit Rule Tag
          </button>
          {isFieldsLoading && <p className="mt-2 text-center">Loading...</p>}
        </form>

        {isFieldsAvailable && (
          <form
            className="flex-1 flex flex-col gap-4"
            onSubmit={onSubmitFields}
          >
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Fields
            </label>
            <ul className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <li key={index}>
                  <input
                    type={
                      field === "age" ||
                      field === "salary" ||
                      field === "experience"
                        ? "number"
                        : "text"
                    }
                    placeholder={field}
                    onChange={(e) => onFieldChange(field, e.target.value)}
                    className="p-3 rounded border border-gray-300 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </li>
              ))}
            </ul>
            <button
              type="submit"
              className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
            >
              Validate
            </button>
          </form>
        )}
      </div>

      {notification && (
        <div
          id="toast-default"
          className="absolute top-0 right-[10%] flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
              />
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{notification}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => setNotification("")}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidateRule;
