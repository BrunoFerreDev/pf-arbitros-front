import { ref } from 'vue';
import api from '../services/api';

export function useAuth() {
  const loading = ref(false);
  const error = ref(null);
  const user = ref(null);

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      // Usando las llaves dni y email que vimos en LoginCard.vue
      const { data } = await api.post('/auth/login', { dni: password, email });
      if (data.jwt && data.status) {
        localStorage.setItem('token', data.jwt);
        return data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('arbitro');
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchAuthenticatedUser = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/personas/autenticado');
      user.value = data;
      localStorage.setItem('arbitro', JSON.stringify(data));
      return data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    fetchAuthenticatedUser,
  };
}
