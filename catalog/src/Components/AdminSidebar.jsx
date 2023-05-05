import React from 'react';

const AdminSidebar = ({ options, activeOption, setActiveOption }) => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h1 className="text-xl font-semibold mb-5">Admin Options</h1>
      <ul>
        {options.map((option) => (
          <li
            key={option.value}
            className={`mb-3 p-2 rounded ${
              activeOption === option.value ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveOption(option.value)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
