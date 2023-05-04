import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import AdminSidebar from '../Components/AdminSidebar';
import ViewTemplates from '../Components/ViewTemplates';
import ViewRecords from '../Components/ViewRecords';
import ApproveDenyRecords from '../Components/ApproveDenyRecords';

const navigation = [
  { name: 'View Templates', value: 'view_templates', current: true },
  { name: 'View Records', value: 'view_records', current: false },
  { name: 'Approve/Deny Records', value: 'approve_deny_records', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeOption, setActiveOption] = useState('view_templates');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://gettemplates1.azurewebsites.net/api/Templates');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const jsonData = await response.json();
        const formattedData = jsonData.map((template) => ({
          ...template,
          fields: template.fields.split(', '),
        }));
        setData(formattedData);
        console.log(formattedData);
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
      <Header />
      <div className="flex">
        <AdminSidebar
          options={navigation}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <div>
          {/* <h1>{JSON.stringify(data)}</h1>
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */}
        </div>
        <div className="p-5 w-full">
        {activeOption === 'view_templates' && <ViewTemplates templates={data} setTemplates={setData} />}
          {activeOption === 'view_records' && <ViewRecords />}
          {activeOption === 'approve_deny_records' && <ApproveDenyRecords />}
        </div>
      </div>
    </div>
  );
}
