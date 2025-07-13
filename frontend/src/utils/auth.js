import { clearAuth, setAuth } from '@/store/authSlice';

// Глобальная переменная для хранения ссылки на store
let storeInstance = null;

// Функция для установки ссылки на store
export const setStore = (store) => {
  storeInstance = store;
};

export const getAuthToken = () => {
  if (!storeInstance) {
    // Если store еще не инициализирован, берем токен только из localStorage
    return localStorage.getItem('token');
  }
  
  const state = storeInstance.getState();
  const token = state.auth.token;
  
  if (!token) {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      storeInstance.dispatch(setAuth({ 
        username: localStorage.getItem('username') || '', 
        token: localToken 
      }));
      return localToken;
    }
  }
  
  return token;
};

export const handleAuthError = (error) => {
  if (error?.response?.status === 401) {
    if (storeInstance) {
      storeInstance.dispatch(clearAuth());
    }
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    window.location.href = '/login';
  }
  return error;
};

export const createAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Проверка валидности токена
export const isTokenValid = () => {
  const token = getAuthToken();
  return !!token && token !== 'null' && token !== 'undefined';
};

// Синхронизация токена между store и localStorage
export const syncAuthToken = () => {
  if (!storeInstance) {
    return;
  }
  
  const state = storeInstance.getState();
  const storeToken = state.auth.token;
  const localToken = localStorage.getItem('token');
  
  if (storeToken && !localToken) {
    // Если токен есть в store, но нет в localStorage
    localStorage.setItem('token', storeToken);
    localStorage.setItem('username', state.auth.username);
  } else if (!storeToken && localToken) {
    // Если токен есть в localStorage, но нет в store
    const username = localStorage.getItem('username');
    storeInstance.dispatch(setAuth({ username: username || '', token: localToken }));
  }
}; 