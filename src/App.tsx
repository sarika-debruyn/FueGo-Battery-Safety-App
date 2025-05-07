import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import BatteryDetails from './pages/BatteryDetails';
import RewardsPage from './pages/RewardsPage';
import SwapStationsPage from './pages/SwapStationsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="battery" element={<BatteryDetails />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="swap-stations" element={<SwapStationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;