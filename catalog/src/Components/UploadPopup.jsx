import React, { useState, useEffect } from "react";

function UploadPopup({ onClose }) {
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  function handleSecondPopupButtonClick(template) {
    setShowSecondPopup(template.templateID);
  }

  function handleSecondPopupClose() {
    setShowSecondPopup(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Choose a Template:</h2>
        <div className="mb-4">
          <ul class="my-4 space-y-3">
            {templates.map((template) => (
              <li key={template.templateID}>
                <button
                  class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  onClick={() => handleSecondPopupButtonClick(template)}
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {template.templateName}
                  </span>
                </button>

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
}

function SecondPopup({ onClose, template }) {
  const [formValues, setFormValues] = useState({});
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      elements: {
        ...prevFormValues.elements,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit clicked");
    try {
      const formData = new FormData();
      formData.append("templateID", template.templateID);
      formData.append("file", file);

      Object.entries(formValues.elements).forEach(([key, value]) => {
        formData.append(`elements.${key}`, value);
      });

      console.log("Request Body:", formData);

      const response = await fetch(
        "https://getdocument.azurewebsites.net/api/Documents/uploadDocument",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Your document has been uploaded successfully: ", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error occurred while uploading the document: ", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-4">{template.templateName}</h1>
            {template.fields.split(",").map((field, index) => (
              <React.Fragment key={index}>
                <label
                  htmlFor={field.trim()}
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  {field.trim()}
                </label>
                <input
                  type="text"
                  name={field.trim()}
                  id={field.trim()}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
              </React.Fragment>
            ))}
            <label
              htmlFor="file"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              File Upload
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleFileChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-between mt-2 space-x-2">
              <button
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
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

export default UploadPopup;
