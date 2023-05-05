import React from 'react';

function UploadPopup(props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Upload a file</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="file" className="block font-bold mb-2">Choose a file:</label>
              <input type="file" id="file" name="file" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
          </form>
        </div>
      </div>
    );
}

export default UploadPopup;
