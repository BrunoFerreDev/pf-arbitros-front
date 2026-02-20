// src/hooks/useIncidencias.js
import { ref } from 'vue';
import api from '../services/api';

export function useIncidencias() {
  const loading = ref(false);
  const error = ref(null);

  const fetchClubInfo = async (idClub) => {
      loading.value = true;
      try {
          const { data } = await api.get('/club/informacion', { params: { idClub } });
          return data;
      } catch (err) {
          error.value = err;
          throw err;
      } finally {
          loading.value = false;
      }
  };

  const submitIncidencia = async (payload) => {
      loading.value = true;
      try {
          // El payload será el body directo (incluye idIncidencia, minuto, idPersona, etc)
          const { data } = await api.post('/arbitros/partido/completar-informe', payload);
          return data;
      } catch (err) {
          error.value = err;
          throw err;
      } finally {
          loading.value = false;
      }
  };

  const registrarSustitucion = async (motSalida, motEntrada, minuto, jugadorSaliente, jugadorEntrante) => {
      loading.value = true;
      try {
          await Promise.all([
             api.post('/arbitros/partido/completar-informe', { idIncidencia: motSalida.idIncidencia, minuto, idPersona: jugadorSaliente }),
             api.post('/arbitros/partido/completar-informe', { idIncidencia: motEntrada.idIncidencia, minuto, idPersona: jugadorEntrante })
          ]);
      } catch (err) {
          error.value = err;
          throw err;
      } finally {
          loading.value = false;
      }
  }

  return {
    loading,
    error,
    fetchClubInfo,
    submitIncidencia,
    registrarSustitucion
  };
}
