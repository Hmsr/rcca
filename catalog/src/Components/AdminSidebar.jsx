import React from 'react';
import CarCar from '../Components/Car';
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
            <div className="flex items-center">
            {/* <FolderIcon className="h-5 w-5 " aria-hidden="true" /> */}
            {option.name}
            
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '50px', height: '400px' }}>
      <CarCar />
      </div>
    </div>
  );
};

export default AdminSidebar;
