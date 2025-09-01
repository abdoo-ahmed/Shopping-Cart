import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import CartPage from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';


export default function App() {
return (
<AppProvider>
<BrowserRouter>
<Header />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>
</AppProvider>
);
}