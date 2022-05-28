import { Outlet, Route, Routes } from 'react-router-dom';

import { StyledDashboardContainer } from '../styles/dashboard.styles';
import DashboardHome from '../components/dashboard/Home';
import UpdateName from '../components/dashboard/UpdateName';
import NotFound from './NotFound';
import Watchlist from '../components/dashboard/Watchlist';

const Dashboard = () => {
  return (
    <StyledDashboardContainer>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="update-name" element={<UpdateName />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </StyledDashboardContainer>
  );
};

export default Dashboard;
