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
import Login from './routes/Login';
import { AuthContextProvider } from './auth/authProvider';

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
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <div>
                    <h1>Dashboard</h1>
                  </div>
                }
              />
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
