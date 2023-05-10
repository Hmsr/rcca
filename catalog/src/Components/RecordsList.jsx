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

  function handleRecordClose() {
    setShowRecord(false);
  }

  function handleButtonClick() {
    setShowRecord(true);
  }
    return (
    
      <ul role="list" className="divide-y divide-gray-100 w-full" >
        {records.map((record) => (
          <li key={record.tag} className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 cursor-pointer" onClick={handleButtonClick}>
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={record.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{record.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{record.tag}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{record.uploadYear}</p>
              {record.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={record.lastSeenDateTime}>{record.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  {/* <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p> */}
                </div>
              )}
            </div>
          </li>
        ))}
      <RecordPopup id="defaultModal" showModal={showRecord} onClose={handleRecordClose}>
        <h3 className="text-xl font-semibold">
          Rover 75 CDTI DIESEL
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
  