import React, { useState, useEffect } from 'react';

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1 className="text-2xl mb-4">View/Edit Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div key={record.documentID} className="bg-white shadow-md rounded p-4">
            <p className="text-sm font-bold text-gray-700">Document ID: {record.documentID}</p>
            <p className="text-sm font-bold text-gray-700">Template ID: {record.templateID}</p>
            <p className="text-lg font-semibold text-gray-900">Document Reference: {record.documentReference}</p>
            <p className="text-sm font-medium text-gray-600">Waiting Admin Approval: {record.waitingAdminApproval.toString()}</p>
            <button
  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
  onClick={() => handleEditClick(record)}
>
  Edit
</button>
<button
  className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
  onClick={() => handleApproveClick(record)}
>
  Approve
</button>
<button
  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
  onClick={() => handleDenyClick(record)}
>
  Deny
</button>
</div>
        ))}
      </div>
    </div>
  );
};

export default ViewRecords;
