import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './styles/global.styles';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthContextProvider } from './state/auth/authProvider';
import { WatchlistProvider } from './state/watchlist/watchlistProvider';
import Loader from './components/loader/Loader.component';

const PasswordReset = lazy(() => import('./routes/PasswordReset'));
const Detail = lazy(() => import('./routes/Detail'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Home = lazy(() => import('./routes/Home'));
const Sort = lazy(() => import('./routes/Sort'));
const Account = lazy(() => import('./routes/Account'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const PrivateRoute = lazy(() => import('./components/routing/PrivateRoute.component'));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthContextProvider>
          <WatchlistProvider>
            <Suspense fallback={<Loader fullScreen />}>
              <Routes>
                <Route path="/" element={<App />}>
                  {/* homepage */}
                  <Route index element={<Home />} />
                  {/* Account pages */}
                  <Route path="account/*">
                    <Route index element={<Account type="login" />} />
                    <Route path="login" element={<Account type="login" />} />
                    <Route path="register" element={<Account type="create" />} />
                    <Route path="password-reset" element={<PasswordReset />} />
                    <Route
                      path="dashboard/*"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                  {/* Category Pages */}
                  <Route path="movies" element={<Sort category="movie" />} />
                  <Route path="tv" element={<Sort category="tv" />} />
                  {/* Detail Pages */}
                  <Route path="movie/:id" element={<Detail type="movie" />} />
                  <Route path="tv/:id" element={<Detail type="tv" />} />
                  {/* Everything else - 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </WatchlistProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
