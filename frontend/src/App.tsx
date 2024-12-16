import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import Dashboard from './pages/Dashboard/index.tsx';
import Summary from './pages/Summary/index.tsx';
import Usage from './pages/Usage/index.tsx';
import Monthly from './pages/Monthly/index.tsx';
import Fee from './pages/Fee/index.tsx';
import Invoice from './pages/Invoice/index.tsx';
import Bill from './pages/Billing/index.tsx';
//import HEAD from './components/header/index.tsx';
//import FullLayout from "./layouts/FullLayout/index.tsx";

const App: React.FC = () => {
  return (
    <Router>
      {/* Header component outside of Routes */}
  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </Router>
  );
};

export default App;
