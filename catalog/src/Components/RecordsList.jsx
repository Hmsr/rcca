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
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recordWindowVisible, setRecordWindowVisible] = useState(false);
  function handleRecordClose() {
    setShowRecord(false);
  }

  function handleButtonClick() {
    setShowRecord(true);
  }
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

    return (
    
      <ul role="list" className="divide-y divide-gray-100 w-full" >
        {records.map((record) => (
/*           <li key={record.tag} className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 cursor-pointer" onClick={handleButtonClick}>
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={record.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{record.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{record.tag}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{record.uploadYear}</p>
            </div>
          </li> */
          <li
          key={record.documentID}
          className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 cursor-pointer" onClick={handleButtonClick}
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
        
      <RecordPopup id="defaultModal" showModal={showRecord} onClose={handleRecordClose}>
        <h3 className="text-xl font-semibold">
          ROVER 75 CDTI DIESEL
        </h3>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25 and is meant to ensure a common set of data
          rights in the European Union. It requires organizations to notify
          users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleRecordClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Download
          </button>
        </div>
      </RecordPopup>  
      </ul>
      
    )
  }
  