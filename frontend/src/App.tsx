import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import Payments from './pages/payments/Payments'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
    </Routes>
  );
}

export default App;
