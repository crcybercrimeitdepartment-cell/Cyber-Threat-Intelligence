import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './footer/Footer';
import BackButton from './components/BackButton';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-[#010914] font-sans text-white flex flex-col">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex-1 watermark-bg flex flex-col relative">
          <BackButton />
          <AppRoutes />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
