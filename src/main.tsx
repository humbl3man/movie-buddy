import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './styles/global';
import App from './App';
import Home from './routes/Home';
import Sort from './routes/Sort';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Detail from './routes/Detail';
import NotFound from './routes/NotFound';
import { AuthContextProvider } from './auth/authProvider';
import Account from './routes/Account';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PasswordReset from './routes/PasswordReset';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Account type="login" />} />
              <Route path="/create-account" element={<Account type="create" />} />
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/movies" element={<Sort category="movie" />} />
              <Route path="/tv" element={<Sort category="tv" />} />
              <Route path="/movie/:id" element={<Detail type="movie" />} />
              <Route path="/tv/:id" element={<Detail type="tv" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
