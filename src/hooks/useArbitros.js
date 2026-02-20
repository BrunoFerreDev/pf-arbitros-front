// src/hooks/useArbitros.js
import { ref } from 'vue';
import api from '../services/api';

export function useArbitros() {
  const loading = ref(false);
  const error = ref(null);

  const buscarDesignaciones = async (idArbitro, estado, page = 0, size = 10) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/arbitros/buscar-designaciones', {
        params: { idArbitro, estado, page, size }
      });
      return data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const finalizarInforme = async (idPartido) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post(`/arbitros/partido/finalizar-informe?idPartido=${idPartido}`);
      return data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    buscarDesignaciones,
    finalizarInforme
  };
}
