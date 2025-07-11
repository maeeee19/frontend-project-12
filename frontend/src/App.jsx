import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { routes } from '@/config/routes';
import { store } from '@/store/store';  
import ToastContainer from '@/components/ToastContainer';
import { setAuth } from '@/store/authSlice';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rollbarConfig = {
  accessToken: '8b21a4b759db4d96910286706903aa61',
  environment: 'testenv',
};

const App = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (username && token) {
      store.dispatch(setAuth({ username, token }));
    }
  }, [username, token]); 


  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default App;
