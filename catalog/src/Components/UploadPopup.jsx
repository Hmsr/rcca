import React from "react";
import { useState, useEffect } from "react";
function UploadPopup({ onClose }) {
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  function handleSecondPopupButtonClick(template) {
    setShowSecondPopup(true);
    setSelectedTemplate(template);
  }
  function handleSecondPopupClose() {
    setShowSecondPopup(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic

    // After successful submission, set isSubmitted to true
    setIsSubmitted(true);
  };
  const handleSelectedTemplate = (template) => {
    setSelectedTemplate(template);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://gettemplates1.azurewebsites.net/api/Templates/"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Choose a Template:</h2>
        <div className="mb-4">
          <ul class="my-4 space-y-3">
            {templates.map((template) => (
              <li key={template.templateID}>
                <a
                  class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  onClick={() => {
                    handleSecondPopupButtonClick(template);
                    setShowSecondPopup(template.templateID);
                  }}
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {" "}
                    {template.templateName}
                  </span>
                </a>

                {showSecondPopup === template.templateID && (
                  <SecondPopup
                    onClose={handleSecondPopupClose}
                    template={template}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
  function SecondPopup({ template }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div key={template.templateID} class="mb-6">
              <h1 className="text-xl font-bold mb-4">
                {template.templateName}
              </h1>
              {console.log(template.templateName)}
              {template.fields.split(",").map((field, index) => (
                <React.Fragment key={index}>
                  <label
                    for="field"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {field.trim()}
                  </label>
                  <input
                    type="text"
                    name="field"
                    id="field"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex justify-between mt-2 space-x-2">
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={onClose}
                >
                  Close
                </button>
                <button className="bg-green-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {isSubmitted && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg p-8">
                <p className="text-xl font-bold mb-4">
                  Submit successfully uploaded
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsSubmitted(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UploadPopup;
