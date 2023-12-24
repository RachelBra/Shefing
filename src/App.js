import { Divider } from 'primereact/divider';
import { useState } from 'react';
import UsersTable from './Components/UsersTable'
import Posts from './Components/UserPosts';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (

    <div className="App">
      <div className="flex flex-column md:flex-row">
        <div className={ "w-full justify-content-center gap-3 p-2"}>
          <UsersTable selectedUser={selectedUser} setSelectedUser={setSelectedUser}></UsersTable>
        </div>
        {selectedUser && //When selecting a user, a right part is added to the page according to the user's number
          <>
            <Divider layout="vertical" className="hidden md:flex">
            </Divider>
            <Divider layout="horizontal" className="flex md:hidden" align="center">
            </Divider>
            <div className="w-full  flex flex-column align-items-center justify-content-center p-2">
              <Posts selectedUser={selectedUser} ></Posts>
            </div>
          </>
        }
      </div>
    </div>

  );
}

export default App;
