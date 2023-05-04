import React from 'react';

function ViewTemplates({ templates }) {
  console.log(templates);
  
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
            <p className="text-sm font-medium text-gray-600">Fields: {item.fields}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTemplates;
