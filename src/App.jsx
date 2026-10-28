import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './footer/Footer';
import BackButton from './components/BackButton';
import { UIProtection } from './security/UIProtection';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-[#010914] font-sans flex flex-col">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <UIProtection
          antiCopy={true}
          antiSelect={true}
          antiDrag={true}
          rightClickProtection={true}
          keyboardShortcutProtection={true}
          imageDragProtection={true}
          imageOpenProtection={true}
          textHighlightProtection={true}
          textDragProtection={true}
          linkInteractionProtection={true}
          readOnlyMode={true}
          printRestriction={true}
          className="flex-1 watermark-bg flex flex-col relative text-white"
        >
          <BackButton />
          <AppRoutes />
        </UIProtection>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
