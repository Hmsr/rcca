import React, { useState } from 'react';
import Header from '../Components/Header';
import AdminSidebar from '../Components/AdminSidebar';
import AddEditTemplates from '../Components/AddEditTemplates';
import ViewEditRecords from '../Components/ViewEditRecords';
import ApproveDenyRecords from '../Components/ApproveDenyRecords';

const navigation = [
  { name: 'Add/Edit Templates', value: 'add_edit_templates', current: true },
  { name: 'View/Edit Records', value: 'view_edit_records', current: false },
  { name: 'Approve/Deny Records', value: 'approve_deny_records', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Admin() {
  const [activeOption, setActiveOption] = useState('add_edit_templates');

  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSidebar
          options={navigation}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <div className="p-5 w-full">
          {activeOption === 'add_edit_templates' && <AddEditTemplates />}
          {activeOption === 'view_edit_records' && <ViewEditRecords />}
          {activeOption === 'approve_deny_records' && <ApproveDenyRecords />}
        </div>
      </div>
    </div>
  );
}
