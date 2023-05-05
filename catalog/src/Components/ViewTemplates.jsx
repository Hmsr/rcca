import React, { useState } from "react";
import {
  ArrowPathIcon,
  Bars3Icon,
  FolderIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
const possibleFields = [
  "Contributor",
  "Coverage",
  "Creator",
  "Description",
  "Format",
  "Identifier",
  "Language",
  "Publisher",
  "Relation",
  "Rights",
  "Source",
  "Subject",
  "Title",
  "Type",
  "Email",
  "Name"
];

export default function ViewTemplates({ templates, setTemplates }) {
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleEditClick = (template) => {
    setSelectedTemplate(template);
    setEditFormVisible(true);
  };

  const handleDeleteClick = async (templateID) => {
    try {
      const response = await fetch(
        `https://gettemplates1.azurewebsites.net/api/Templates/${templateID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTemplates(templates.filter((template) => template.templateID !== templateID));
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedTemplate && selectedTemplate.templateID) {
      // Perform API call to update the template
      try {
        const response = await fetch(
          `https://gettemplates1.azurewebsites.net/api/Templates/${selectedTemplate.templateID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTemplate),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Update the template in the templates state
        setTemplates(
          templates.map((template) =>
            template.templateID === selectedTemplate.templateID
              ? selectedTemplate
              : template
          )
        );
      } catch (error) {
        console.error("Error updating template:", error);
      }
    } else {
      // Perform API call to create the new template
      try {
        const response = await fetch("https://gettemplates1.azurewebsites.net/api/Templates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateName: selectedTemplate.templateName,
            // change this to submit an array not string!!!!
            fields: selectedTemplate.fields.join(", "),
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const newTemplate = await response.json();
        // Add the new template to the state
        setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
      } catch (error) {
        console.error("Error creating template:", error);
      }
    }

    // Close the form and clear the selected template
    setEditFormVisible(false);
    setSelectedTemplate(null);
  };


  const handleFieldToggle = (field) => {
    if (selectedTemplate === null) {
      // Initialize a new template object with the provided field
      setSelectedTemplate({
        fields: [field],
        // Add other necessary properties with default values if needed
      });
    } else {
      const updatedFields = selectedTemplate.fields.includes(field)
        ? selectedTemplate.fields.filter((f) => f !== field)
        : [...selectedTemplate.fields, field];
  
      setSelectedTemplate({
        ...selectedTemplate,
        fields: updatedFields,
      });
    }
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl"></h1>
        <div className="p-5 flex items-center justify-center">
  <ClipboardDocumentIcon className="h-20 w-20" aria-hidden="true" />
</div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setEditFormVisible(true);
            setSelectedTemplate(null);
          }}
        >
          Add Template
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((item) => (
          <div key={item.templateID} className="bg-white shadow-md rounded p-4">
            <p className="text-sm font-bold text-gray-700">
              ID: {item.templateID}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {item.templateName}
            </p>
            <p className="text-sm font-medium text-gray-600">
              Fields: {item.fields.join(", ")}
            </p>
            <div className="mt-2 space-x-2">
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded shadow"
              onClick={() => handleEditClick(item)}
            >
              Edit
            </button>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded shadow"
              onClick={() => handleDeleteClick(item.templateID)}
            >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
      {editFormVisible && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setEditFormVisible(false)}
        >
          <div
            className="bg-white w-full max-w-md p-8 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-4">
              {selectedTemplate ? "Edit Template" : "Add Template"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2">
                Template Name:
                <input
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  type="text"
                  value={selectedTemplate ? selectedTemplate.templateName : ""}
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
                    <label
                      key={field}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={
                          selectedTemplate && selectedTemplate.fields.includes(field)
                        }
                        onChange={() => handleFieldToggle(field)}
                      />
                      <span className="ml-2">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2 space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-4 shadow"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow"
                type="button"
                onClick={() => setEditFormVisible(false)}
              >
                Cancel
                </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
                      }