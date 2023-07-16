import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useStateContext } from './Contexts/ContextProvider';
import { Login, CreateBandobast, Dashboard, ManageAdmin, RegisterHardware, RegisterPersonnel, Setting } from './Pages';
import { Sidebar } from './Components';

function App() {
  const { user, auth, activeMenu } = useStateContext();
  // auth();

  return (
    <>
      {
        user.isLogged &&
        <div>
          <Sidebar />
          <div className={activeMenu ? 'ml-72': ''}>
            <Routes >
              <Route path='/login' element={<Login />} />
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/register/personnel' element={<RegisterPersonnel />} />
              <Route path='/register/hardware' element={<RegisterHardware />} />
              <Route path='/create/bandobast' element={<CreateBandobast />} />
              <Route path='/manage/admin' element={<ManageAdmin />} />
              <Route path='/setting' element={<Setting />} />
            </Routes >
          </div>
        </div>
      }

    </>
  );
}

export default App;
