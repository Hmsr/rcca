import React, { useState } from 'react';

const possibleFields = [
  'contributor',
  'coverage',
  'creator',
  'date',
  'description',
  'test',
  'jordan smells like pancakes'
];

function ViewTemplates({ templates, setTemplates }) {
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleEditClick = (template) => {
    setSelectedTemplate(template);
    setEditFormVisible(true);
  };

  const handleDeleteClick = async (templateID) => {
    try {
      const response = await fetch(`https://gettemplates1.azurewebsites.net/api/Templates/${templateID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTemplates(templates.filter((template) => template.templateID !== templateID));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Perform API call to update the template
    // ...

    // Close the form and clear the selected template
    setEditFormVisible(false);
    setSelectedTemplate(null);
  };

  const handleFieldToggle = (field) => {
    const updatedFields = selectedTemplate.fields.includes(field)
      ? selectedTemplate.fields.filter((f) => f !== field)
      : [...selectedTemplate.fields, field];

    setSelectedTemplate({
      ...selectedTemplate,
      fields: updatedFields,
    });
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((item) => (
          <div
            key={item.templateID}
            className="bg-white shadow-md rounded p-4"
          >
            <p className="text-sm font-bold text-gray-700">ID: {item.templateID}</p>
            <p className="text-lg font-semibold text-gray-900">{item.templateName}</p>
            <p className="text-sm font-medium text-gray-600">Fields: {item.fields.join(', ')}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEditClick(item)}
            >
              Edit
            </button>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDeleteClick(item.templateID)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {editFormVisible && selectedTemplate && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setEditFormVisible(false)}
        >
          <div
            className="bg-white w-full max-w-md p-8 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-4">Edit Template</h2>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2">
                Template Name:
                <input
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  type="text"
                  value={selectedTemplate.templateName}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      templateName: e.target.value,
                    })
                  }
                />
              </label>
              <div className="block mb-4">
                <span className="text-sm font-semibold">Fields:</span>
                <div className="mt-2">
                  {possibleFields.map((field) => (
                    <label key={field} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedTemplate.fields.includes(field)}
                        onChange={() => handleFieldToggle(field)}
                        />
                        <span className="ml-2">{field}</span>
                        </label>
                        ))}
                        </div>
                        </div>
                        <button
                                     className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                                     type="submit"
                                   >
                        Save
                        </button>
                        <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        type="button"
                        onClick={() => setEditFormVisible(false)}
                        >
                        Cancel
                        </button>
                        </form>
                        </div>
                        </div>
                        )}
                        </div>
                        );
                        }
                        
                        export default ViewTemplates;
