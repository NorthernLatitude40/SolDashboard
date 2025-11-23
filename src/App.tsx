import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import PoolListPage from './pages/PoolListPage';
import SerumListPage from './pages/SerumListPage';
import SerumPoolListPage from './pages/SerumPoolListPage';
import SerumPoolDetailPage from './pages/SerumPoolDetailPage';
import PlmintAccountListPage from './pages/PlmintAccountListPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="pools" element={<PoolListPage />} />
        <Route path="serum" element={<SerumListPage />} />
        <Route path="serum/:addr" element={<SerumPoolListPage />} />
        <Route path="serum/pool/:addr" element={<SerumPoolDetailPage />} />
        <Route path="/serum/pool/account/:addr" element={<PlmintAccountListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;
