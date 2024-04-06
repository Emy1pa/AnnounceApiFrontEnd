import React from 'react';
import Header from './Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Organizer from './Organizer'; 
import Volunteer from './Volunteer'; 
import AnnounceList from './AnnounceList'; 

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/announceList" element={<AnnounceList />} />
      </Routes>
    </div>
  );
}

export default App;
