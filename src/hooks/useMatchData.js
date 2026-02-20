// composables/useMatchData.js
import { ref } from 'vue';
import api from '../services/api';

export function useMatchData(idPartido) {
  const cargando = ref(true);
  const partido = ref({});
  const jugadoresLocal = ref([]);
  const jugadoresVisitante = ref([]);
  const clubLocal = ref({});
  const clubVisita = ref({});
  const cronologia = ref([]);
  const catalogoGestion = ref([]);
  const incidencias = ref([]); // Si las necesitas para algo interno

  // --- API CALLS ---
  const fetchPartidoBase = async () => {
    const { data } = await api.get(`/partidos/${idPartido}`);
    partido.value = data;
    clubLocal.value = data.clubLocal;
    clubVisita.value = data.clubVisitante;
    return data;
  };

  const fetchJugadores = async () => {
    const { data } = await api.get(`/partidos/obtener-jugadores`, {
      params: { idPartido, categoria: "PRIMERA" },
    });
    jugadoresLocal.value = data.clubLocal.jugadores || [];
    jugadoresVisitante.value = data.clubVisita.jugadores || [];
  };

  const fetchCronologia = async () => {
    const { data } = await api.get(`/partidos/${idPartido}/traer-detalles`);
    data.sort((a, b) => b.incidencia.minuto - a.incidencia.minuto);
    cronologia.value = data;
  };

  const fetchCatalogoGestion = async () => {
    const { data } = await api.get("/incidencias/catalogo-gestion");
    catalogoGestion.value = data;
  };

  const fetchIncidenciasDisponibles = async () => {
     const { data } = await api.get("/incidencias/obtener-disponibles");
     incidencias.value = data;
  };

  // --- FUNCIÓN PRINCIPAL ---
  const initData = async () => {
    try {
      cargando.value = true;
      // 1. Necesitamos el partido primero para saber quienes juegan
      await fetchPartidoBase();
      
      // 2. Cargamos todo lo demás en paralelo para mayor velocidad
      await Promise.all([
        fetchJugadores(),
        fetchCronologia(),
        fetchCatalogoGestion(),
        fetchIncidenciasDisponibles()
      ]);
    } catch (error) {
      console.error("Error cargando datos del partido:", error);
    } finally {
      cargando.value = false;
    }
  };

  return {
    cargando,
    partido,
    clubLocal,
    clubVisita,
    jugadoresLocal,
    jugadoresVisitante,
    cronologia,
    catalogoGestion,
    incidencias,
    initData,
    fetchCronologia // Exportamos esta por si necesitas recargarla individualmente
  };
}