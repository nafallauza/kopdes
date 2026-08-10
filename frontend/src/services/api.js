// API Client abstraction for backend integration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const fetchAPI = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = localStorage.getItem('koperasi_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan pada server');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export const apiService = {
  get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
  post: (endpoint, body) => fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

export default apiService;
