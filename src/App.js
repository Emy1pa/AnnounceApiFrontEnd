import React from 'react';
import Header from './Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Organizer from './Organizer'; 
import Volunteer from './Volunteer'; 

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/volunteer" element={<Volunteer />} />
      </Routes>
    </div>
  );
}

export default App;
