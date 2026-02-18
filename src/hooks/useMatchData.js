// composables/useMatchData.js
import { ref } from 'vue';
import axios from 'axios';

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

  // Helper para headers
  const getAuthHeader = () => ({
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
  });

  // --- API CALLS ---
  const fetchPartidoBase = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/partidos/${idPartido}`, getAuthHeader());
    partido.value = data;
    clubLocal.value = data.clubLocal;
    clubVisita.value = data.clubVisitante;
    return data;
  };

  const fetchJugadores = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/partidos/obtener-jugadores`, {
      ...getAuthHeader(),
      params: { idPartido, categoria: "PRIMERA" },
    });
    jugadoresLocal.value = data.clubLocal.jugadores || [];
    jugadoresVisitante.value = data.clubVisita.jugadores || [];
  };

  const fetchCronologia = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/partidos/${idPartido}/traer-detalles`, getAuthHeader());
    data.sort((a, b) => b.incidencia.minuto - a.incidencia.minuto);
    cronologia.value = data;
  };

  const fetchCatalogoGestion = async () => {
    const { data } = await axios.get("http://localhost:8080/api/incidencias/catalogo-gestion", getAuthHeader());
    catalogoGestion.value = data;
  };

  const fetchIncidenciasDisponibles = async () => {
     const { data } = await axios.get("http://localhost:8080/api/incidencias/obtener-disponibles", getAuthHeader());
     incidencias.value = data;
     // Nota: He removido los filtros de goles/tarjetas aquí porque no se usaban en tu template original.
     // Si los necesitas, puedes agregar computed properties que retornen incidencias.value.filter(...)
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