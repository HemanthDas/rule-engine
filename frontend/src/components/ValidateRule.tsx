const ValidateRule = () => {
  return (
    <div className="p-5 max-w-md mx-auto border border-gray-300 rounded-lg">
      <form className="flex flex-col gap-2.5">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Enter the Rule Tag
          </label>
          <input
            type="text"
            required
            className="p-2 rounded border border-gray-300 w-full text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2.5 rounded border-none bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        >
          Validate
        </button>
      </form>
    </div>
  );
};

export default ValidateRule;
