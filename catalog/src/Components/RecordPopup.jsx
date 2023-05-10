import React from "react";

function RecordPopup(props) {
  return (
    <div
      id={props.id}
      className={`fixed top-0 left-0 right-0 z-50 w-full h-full overflow-auto bg-opacity-50 ${
        props.showModal ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-md w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="flex justify-end pt-2 pr-2">
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={props.onClose}
            >
              X
            </button>
          </div>
          <div className="p-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default RecordPopup;
