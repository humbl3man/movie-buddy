import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Loader from '../components/loader/Loader.component';

import { StyledDashboardContainer } from '../styles/page/dashboard.styles';

const DashboardHome = lazy(() => import('../components/dashboard/Home.component'));
const UpdateName = lazy(() => import('../components/dashboard/UpdateName.component'));
const NotFound = lazy(() => import('./NotFound'));
const Watchlist = lazy(() => import('../components/dashboard/Watchlist.component'));

const Dashboard = () => {
  return (
    <StyledDashboardContainer>
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="update-name" element={<UpdateName />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Outlet />
    </StyledDashboardContainer>
  );
};

export default Dashboard;
