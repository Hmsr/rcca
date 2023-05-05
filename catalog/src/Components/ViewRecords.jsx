import React, { useState, useEffect } from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  FolderIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


const RecordWindow = ({ record, onClose, onEdit, onApprove, onDeny }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-8 rounded shadow-lg">
      <div className="p-5 flex justify-center">
  <DocumentTextIcon className="h-20 w-20" aria-hidden="true" />
</div>

        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Document ID:</p>
          <p className="text-lg font-semibold text-gray-900">{record.documentID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Template ID:</p>
          <p className="text-lg font-semibold text-gray-900">{record.templateID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Waiting Admin Approval:</p>
          <p className="text-lg font-semibold text-gray-900">{record.waitingAdminApproval.toString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Document Reference:</p>
          <a
            href={record.documentReference}
            download
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Download
          </a>
        </div>
        <div className="mt-2 space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={() => onEdit(record)}
          >
            Edit
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow"
            onClick={() => onApprove(record)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow"
            onClick={() => onDeny(record)}
          >
            Deny
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded shadow"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recordWindowVisible, setRecordWindowVisible] = useState(false);

  const handleEditClick = (record) => {
    console.log('Edit:', record);
  };

  const handleApproveClick = (record) => {
    console.log('Approve:', record);
  };

  const handleDenyClick = (record) => {
    console.log('Deny:', record);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://getdocument.azurewebsites.net/api/Documents/ListOfDocumentsWaiting');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="p-5 flex items-center justify-center">
  <FolderIcon className="h-20 w-20" aria-hidden="true" />
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div key={record.documentID} className="bg-white shadow-md rounded p-4">
            {/* <DocumentTextIcon className="h-5 w-5" aria-hidden="true" /> */}
            <p className="text-sm font-bold text-gray-700">Document ID: {record.documentID}</p>
            <p className="text-sm font-bold text-gray-700">Template ID: {record.templateID}</p>
            <p className="text-sm font-medium text-gray-600">Waiting Admin Approval: {record.waitingAdminApproval.toString()}</p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setSelectedRecord(record);
            setRecordWindowVisible(true);
          }}
        >
          View
        </button>
      </div>
    ))}
  </div>
  {recordWindowVisible && (
    <RecordWindow
      record={selectedRecord}
      onClose={() => {
        setSelectedRecord(null);
        setRecordWindowVisible(false);
      }}
      onEdit={handleEditClick}
      onApprove={handleApproveClick}
      onDeny={handleDenyClick}
    />
  )}
</div>
);
};

export default ViewRecords;
