import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { orderUsers } from '../Services/function';
import { InputText } from 'primereact/inputtext';
import data from '../data/dataServer.json';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../App.css';

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nameAndEmail:{ value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [flag, setFlag] = useState(true);

  useEffect(() => { //loading the users and in case of failure - loading from an outdated JSON (data.users) file and uploading a message to the user
    const fetchData = async () => {
      try {
        const response = await Promise.race([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 60000))
        ]);
        setUsers(orderUsers(response.data));
      } catch (error) {
        setFlag(false);
        setUsers(orderUsers(data.users));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            onChange={(e) => onFilterChange(e)}
            placeholder="Search by name/email"
          />
        </span>
      </div>
    );
  };

  const onFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
      _filters['nameAndEmail'].value = value;
    setFilters(_filters);
  };

  return (
    <div className="card">
      {!flag && <div className="text-red-500 text-lg m-2">Internet connection failed, users is not updated</div>}
      <DataTable
        value={users}
        header={header}
        rows={10}
        responsive
        filters={filters}
        loading={loading}
        emptyMessage="No users found."
        className='select-none'
        selectionMode="single"
        selection={props.selectedUser}
        onSelectionChange={(e) => { props.setSelectedUser(props.selectedUser == e.value.id ? null : e.value.id); console.log("e", e); }}
      >
        <Column
          field="name"
          header="Name"
          filter
          style={{ minWidth: '5rem', wordWrap: 'break-word' }}
          className='select-none'
        />
        <Column
          field="email"
          header="Email"
          filter
          style={{ minWidth: '5rem', wordWrap: 'break-word' }}
          className='select-none'
        />
        <Column
          field="company"
          header="Company name"
          style={{ minWidth: '5rem', wordWrap: 'break-word' }}
          className='select-none'
        />
      </DataTable>
    </div>
  );
};

export default UsersList;
