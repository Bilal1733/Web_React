import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';  
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Index" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
