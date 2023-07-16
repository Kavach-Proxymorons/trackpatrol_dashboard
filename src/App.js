import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useStateContext } from './Contexts/ContextProvider';
import { Login, CreateBandobast, Dashboard, ManageAdmin, RegisterHardware, RegisterPersonnel, Setting } from './Pages';
import { Navbar, Sidebar } from './Components';
import './App.css'

function App() {
  const { user, auth, activeMenu } = useStateContext();
  return (
    <>

      <div className='h-screen'>
        <Sidebar />
        <div className={activeMenu ? 'ml-72' : ''}>
          <Navbar />
            <Routes >
              <Route path='/login' element={<Login />} />
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/register/personnel' element={<RegisterPersonnel />} />
              <Route path='/register/hardware' element={<RegisterHardware />} />
              <Route path='/create/bandobast' element={<CreateBandobast />} />
              <Route path='/manage/admin' element={<ManageAdmin />} />
              <Route path='/setting' element={<Setting />} />
              {/* <Route path='/logout' element={<Login />} /> */}
              <Route path='*' element={<Dashboard />} />
            </Routes >
        </div>
      </div>
    </>
  );
}

export default App;
