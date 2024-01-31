// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import PastOrders from './PastOrders';
import Homepage from './Homepage';
import Login from './Login';
import Cart from './Cart';
import Shop from './Shop';
import { GlobalProvider } from './contexts/GlobalContext'; // Import GlobalProvider
import AuthRedirect from './AuthRedirect';

function App() {
  return (
    <GlobalProvider> {/* Wrap your components with GlobalProvider */}
      <div className="App">
        <BrowserRouter>
        <AuthRedirect />
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage title="Cologne R US" message="Welcome to Cologne R US the finest high-end cologne shop online."/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/past-orders" element={<PastOrders />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default App;
