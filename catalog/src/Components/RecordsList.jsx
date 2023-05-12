import React, { useState, useEffect } from "react";
import RecordPopup from './RecordPopup';

const records = [
    {
      title: 'Rover 75 CDTI DIESEL',
      tag: '1978',
      uploadYear: 'Uploaded 2020',
      imageUrl:
        'https://www.svgrepo.com/show/56192/pdf.svg',
      
    }, 
    {
      title: '2002 Rover 75',
      tag: '2002',
      uploadYear: 'Uploaded 2022',
      imageUrl:
        'https://www.freeiconspng.com/uploads/video-icon-1.png',

    },
    {
      title: 'Rover P6 2000 TC',
      tag: '1969',
      uploadYear: 'Uploaded 2008',
      imageUrl: 'https://www.shareicon.net/download/2015/10/23/660695_txt.svg',

    },
  ]
  
export default function RecordsList() {
  const [showRecord, setShowRecord] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleRecordClose() {
    setShowRecord(false);
  }

  function handleButtonClick(record) {
    setShowRecord(true);
    setSelectedDocument(record);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://getdocument.azurewebsites.net/api/Documents/"
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

    return (
    
      <ul role="list" className="divide-y divide-gray-100 w-full" >
        {records.map((record) => (
          <li
          key={record.documentID}
            className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 cursor-pointer" onClick={() => { handleButtonClick(record); setSelectedDocument(record)} }
        >
            <div className="flex gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://www.svgrepo.com/show/56192/pdf.svg' alt="" />
            <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{record.documentID}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{record.templateID}</p>
              </div>
          
        {/*   <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">Uploaded 2022</p>
          </div> */}
         </div>
        </li>
        ))}
        
      <RecordPopup id="defaultModal" showModal={showRecord} onClose={handleRecordClose} record = {selectedDocument}>
       { console.log(selectedDocument)}
          <h3 className="text-xl font-semibold">
          ROVER 75 CDTI DIESEL
        </h3>
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-8 rounded shadow-lg">
        <div className="p-5 flex justify-center"></div>

        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Document ID:</p>
          <p className="text-lg font-semibold text-gray-900">
 { selectedDocument.documentID}  
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Template ID:</p>
          <p className="text-lg font-semibold text-gray-900">
           {/*  {record.templateID} */}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700">Document Reference:</p>
        </div>
        <div className="mt-2 space-x-2">
          {/* <a
            href={record.documentReference}
            download
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Download
          </a> */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded shadow"
            onClick={handleRecordClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
        <div className="flex justify-end">
          <button
            onClick={handleRecordClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Close
          </button>
        </div>
      </RecordPopup>  
      </ul>
      
    )
  }
  