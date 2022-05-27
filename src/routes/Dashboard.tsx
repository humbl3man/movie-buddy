import { Outlet, Route, Routes } from 'react-router-dom';

import { StyledDashboardContainer } from '../styles/dashboard.styles';
import DashboardHome from '../components/dashboard/Home';
import UpdateName from '../components/dashboard/UpdateName';
import NotFound from './NotFound';

const Dashboard = () => {
  return (
    <StyledDashboardContainer>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="update-name" element={<UpdateName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </StyledDashboardContainer>
  );
};

export default Dashboard;
