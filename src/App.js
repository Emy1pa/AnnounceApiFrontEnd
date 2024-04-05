import React from 'react';
import Header from './Header';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {
  return ( 
    <div className="App">
     <Header />
     <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
     </div>     
  );
}

export default App;
