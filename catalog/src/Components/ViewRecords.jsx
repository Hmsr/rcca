import React, { useState, useEffect } from "react";
import {
  ArrowPathIcon,
  Bars3Icon,
  FolderIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const RecordWindow = ({ record, onClose, onEdit, onApprove, onDeny }) => {
  const renderFormElements = (obj) => {
    return (
      <div className="flex flex-wrap">
        {Object.entries(obj).map(
          ([key, value]) =>
            value && (
              <div
                key={key}
                className="border border-gray-200 bg-blue-50 p-2 rounded mr-4 mb-2 shadow-md"
              >
                <p className="text-xs font-bold text-gray-700 capitalize">
                  {key}:
                </p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white w-full max-w-xl p-4 rounded shadow-lg overflow-auto">
        <div className=" p-5 flex justify-center"></div>
        {/* 
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Form Elements:</p>
          <pre className="text-lg font-semibold text-gray-900 whitespace-pre-wrap">
            {JSON.stringify(record.formElements, null, 2)}
          </pre>
        </div> */}

        <div className="mb-2 ">
          <p className="text-sm font-bold text-gray-700 ">Elements:</p>
          <div className="pl-2 p-2 bg-gray-50 flex flex-wrap justify-between">
            {renderFormElements(record.formElements)}
          </div>
        </div>

        <div className="mb-2 bg-gray-50">
          <p className="text-xs font-bold text-gray-700">Document ID:</p>
          <p className="text-sm font-semibold text-gray-900">
            {record.documentID}
          </p>
        </div>
        <div className="mb-2 bg-gray-50">
          <p className="text-xs font-bold text-gray-700">Template ID:</p>
          <p className="text-sm font-semibold text-gray-900">
            {record.templateID}
          </p>
        </div>
        <div className="mb-2 bg-gray-50">
          <p className="text-sm font-bold text-green-500">
            Waiting Admin Approval:{" "}
            <strong>{record.waitingAdminApproval.toString()}</strong>
          </p>
        </div>

        <div className="mb-2 bg-gray-50">
          <p className="text-sm font-bold text-gray-700">Document Reference:</p>
          {/* <a
            href={record.documentReference}
            download
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Download
          </a> */}
        </div>
        <div className="mt-2 space-x-2">
          <a
            href={record.documentReference}
            download
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Download
          </a>
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={() => onEdit(record)}
          >
            Edit
          </button> */}
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
    console.log("Edit:", record);
  };

  const handleApproveClick = async (record) => {
    const response = await fetch(
      `https://getdocument.azurewebsites.net/api/Documents/approveDocument/${record.documentID}`,
      {
        method: "POST",
      }
    );
    setRecords(
      records.filter((record1) => record1.documentID !== record.documentID)
    );
    setRecordWindowVisible(false);
  };

  const handleDenyClick = async (record) => {
    const response = await fetch(
      `https://getdocument.azurewebsites.net/api/Documents/rejectDocument/${record.documentID}`,
      {
        method: "POST",
      }
    );
    setRecords(
      records.filter((record1) => record1.documentID !== record.documentID)
    );
    setRecordWindowVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://getdocument.azurewebsites.net/api/Documents/ListOfDocumentsWaiting"
        );
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
      <div className=" flex items-center justify-center"></div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Records For Approval</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div
            key={record.documentID}
            className="bg-gray-50 shadow-md rounded p-4"
          >
            {/* <DocumentTextIcon className="h-5 w-5" aria-hidden="true" /> */}
            <p className="text-sm font-bold text-gray-700">
              Document ID: {record.documentID}
            </p>
            <p className="text-sm font-bold text-gray-700">
              Template ID: {record.templateID}
            </p>
            <p className="text-sm font-medium text-gray-600">
              Waiting Admin Approval: {record.waitingAdminApproval.toString()}
            </p>
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
