import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryProvider } from './core/providers/QueryProvider';
import { AuthProvider } from './core/providers/AuthProvider';
import { AppRoutes } from './core/routes/AppRoutes';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;