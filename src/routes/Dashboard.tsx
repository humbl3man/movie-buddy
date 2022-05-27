import { Route, Routes } from 'react-router-dom';

import { StyledDashboardContainer } from '../styles/dashboard.styles';
import Home from '../components/dashboard/Home';
import UpdateName from '../components/dashboard/UpdateName';
import NotFound from './NotFound';

const Dashboard = () => {
  return (
    <StyledDashboardContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="update-name" element={<UpdateName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
