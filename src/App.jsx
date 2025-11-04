
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Track from './pages/Track';
import Calculator from './pages/Calculator';
import Support from './pages/Support';
import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
 
      <Footer />
    </div>
  );
}
