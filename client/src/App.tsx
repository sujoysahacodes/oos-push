import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import ActionableDashboard from './components/Dashboard/ActionableDashboard';
import OOSTickets from './pages/OOS/OOSTickets';
import OOSCreate from './pages/OOS/OOSCreate';
import OOSDetails from './pages/OOS/OOSDetails';
import DigitalIntake from './pages/Intake/DigitalIntake';
import ConfigurationManagement from './components/Configuration/ConfigurationManagement';
import NetworkOptimization from './components/Optimization/NetworkOptimization';
import NetworkMapPage from './pages/NetworkMap/NetworkMapPage';
import InventoryValidation from './components/Validation/InventoryValidation';
import Wholesalers from './pages/Wholesalers/Wholesalers';
import Analytics from './pages/Analytics/Analytics';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<ActionableDashboard />} />
                      <Route path="/intake" element={<DigitalIntake />} />
                      <Route path="/configuration" element={<ConfigurationManagement />} />
                      <Route path="/optimization" element={<NetworkOptimization />} />
                      <Route path="/network-map" element={<NetworkMapPage />} />
                      <Route path="/inventory" element={<InventoryValidation />} />
                      <Route path="/oos" element={<OOSTickets />} />
                      <Route path="/oos/create" element={<OOSCreate />} />
                      <Route path="/oos/:id" element={<OOSDetails />} />
                      <Route path="/wholesalers" element={<Wholesalers />} />
                      <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
