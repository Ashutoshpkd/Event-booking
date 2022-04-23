import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Navigation/NavBar';
import Auth from './pages/Auth/Auth';
import classes from './App.module.css'

function App() {
  return (
    <>
    <NavBar 
      title={"Easy Steps"}
      authenticate='Authenticate'
      bookings='Bookings'
      events='Events'
    />
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/bookings" element={null}/>
        <Route path="/events" element={null}/>
      </Routes>
    </>
  );
}

export default App;
