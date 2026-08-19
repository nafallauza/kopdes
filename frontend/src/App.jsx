import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { KopdesProvider } from './context/KopdesContext';

function App() {
  return (
    <AuthProvider>
      <KopdesProvider>
        <Router>
          <AppRoutes />
        </Router>
      </KopdesProvider>
    </AuthProvider>
  );
}

export default App;
