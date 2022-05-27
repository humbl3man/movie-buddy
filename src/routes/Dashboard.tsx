import { Route, Routes } from 'react-router-dom';

import { StyledDashboardContainer } from '../styles/dashboard.styles';
import Home from '../components/dashboard/Home';
import UpdateName from '../components/dashboard/UpdateName';

const Dashboard = () => {
  return (
    <StyledDashboardContainer>
      <Routes>
        <Route index element={<Home />} />
        <Route path="update-name" element={<UpdateName />} />
      </Routes>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
