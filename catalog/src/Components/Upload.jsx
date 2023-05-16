import React, { useEffect, useState } from "react";

function Upload() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    const fields = template.fields.split(",");
    const initialFormValues = fields.reduce((values, field) => {
      values[field.trim()] = "";
      return values;
    }, {});
    setFormValues(initialFormValues);
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://getdocument.azurewebsites.net/api/Documents/uploadDocument",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      alert("Document uploaded successfully!");
      setSelectedTemplate(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Select a Template</h1>
      {templates.map((template) => (
        <button
          key={template.templateID}
          type="button"
          onClick={() => handleTemplateSelect(template)}
        >
          {template.templateName}
        </button>
      ))}
      {selectedTemplate && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <form onSubmit={handleSubmit}>
              <h2>{selectedTemplate.templateName}</h2>
              {selectedTemplate.fields.split(",").map((field) => (
                <div key={field.trim()}>
                  <label>{field.trim()}</label>
                  <input
                    type="text"
                    name={field.trim()}
                    value={formValues[field.trim()]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setSelectedTemplate(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
