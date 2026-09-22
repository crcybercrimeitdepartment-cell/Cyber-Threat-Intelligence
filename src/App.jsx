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
        className="min-h-screen bg-[#010914] font-sans text-white flex flex-col"
      >
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex-1 watermark-bg flex flex-col relative">
          <BackButton />
          <AppRoutes />
        </div>

        <Footer />
      </UIProtection>
    </Router>
  );
}

export default App;
