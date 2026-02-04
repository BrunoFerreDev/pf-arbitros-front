
<script setup>
import { IconLoader } from '@tabler/icons-vue';
import MatchInfoCard from '../components/MatchInfoCard.vue';
import TeamsTabManager from '../components/TeamsTabManager.vue';
import ModalIncidencia from '../components/ModalIncidencia.vue';
import ModalIncidenciaArbitro from '../components/ModalIncidenciaArbitro.vue';
import Cronologia from '../components/Cronologia.vue';
import MatchHeader from '../components/MatchHeader.vue';
import TeamHead from '../components/TeamHead.vue';
import ResultHead from '../components/ResultHead.vue';
import { onMounted, ref,computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
// ... (mismos imports de antes)

// ... (toda la lógica de fetchJugadores, fetchPartido, refs de datos, etc., se queda aquí)
const activeTab = ref("local");
// Datos ficticios de ejemplo (estos vendrían de tu API Java)
const equipoLocal = ref({});
const equipoVisitante = ref({});
const competencia = ref({});
const partido = ref({});
const incidenciasAmonestaciones = ref([]);
const incidenciasExpulsiones = ref([]);
const incidenciasGoles = ref([]);
const incidenciasSustituciones = ref([]);
const incidencias = ref([]);
const router = useRouter();
const idPartido = router.currentRoute.value.params.idPartido;
const cargando = ref(true);
onMounted(async () => {
  setTimeout(() => {
    fetchPartido();
  }, 1000);
});

const fetchIncidencias = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/incidencias/obtener-disponibles",
    );
    const data = response.data;
    incidencias.value = data;
    incidenciasAmonestaciones.value = incidencias.value.filter(
      (incidencia) => incidencia.tipo === "AMONESTACION",
    );
    incidenciasExpulsiones.value = incidencias.value.filter(
      (incidencia) => incidencia.tipo === "EXPULSION",
    );
    incidenciasGoles.value = incidencias.value.filter(
      (incidencia) => incidencia.tipo === "GOL",
    );
    incidenciasSustituciones.value = incidencias.value.filter((incidencia) =>
      incidencia.tipo.includes("SUSTITUCION"),
    );
    return data;
  } catch (error) {
    console.error("Error al obtener las incidencias:", error);
  }
};
const fetchPartido = async () => {
  try {
    cargando.value = true;

    // 1. Obtenemos el partido principal (bloqueante porque necesitamos los datos)
    const response = await axios.get("http://localhost:8080/api/partidos/" + idPartido);
    const data = response.data;

    // 2. Asignamos datos base
    equipoLocal.value = data.clubLocal;
    equipoVisitante.value = data.clubVisitante;
    competencia.value = data.competenciaDTO;
    partido.value = data; // Asumimos que las siguientes funciones usan este valor

    // 3. Ejecutamos las cargas secundarias en paralelo y esperamos a TODAS
    await Promise.all([
      fetchIncidencias(),
      fetchCatalogoGestion(),
      fetchJugadores(),
      fetchCronologia()
    ]);

  } catch (error) {
    console.error("Error al obtener el partido:", error);
  } finally {
    // 4. El spinner se apaga solo cuando TODO ha terminado
    cargando.value = false;
  }
};

const fetchJugadores = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/jugadores/obtener-jugadores`,
      {
        params: {
          idPartido: partido.value.idPartido,
          categoria: "PRIMERA",
        },
      },
    );
    const data = response.data;
    const datoLocal = data.clubLocal;
    const datoVisitante = data.clubVisita;
    equipoLocal.value.jugadores = datoLocal.jugadores;
    equipoVisitante.value.jugadores = datoVisitante.jugadores;
    return data;
  } catch (error) {
    console.error("Error al obtener los jugadores:", error);
  }
};

// ESTADO
const mostrarModal = ref(false); // Controla visibilidad
const jugadorParaIncidencia = ref(null); // Guarda al jugador seleccionado
// FUNCIONES

const cerrarModal = () => {
  mostrarModal.value = false;
  jugadorParaIncidencia.value = null; // Opcional: limpiar selección
};
const procesarExito = () => {
  cerrarModal();
  // Aquí podrías llamar a una función para recargar los datos de la tabla
  // ej: cargarJugadores();
  alert("Incidencia guardada con éxito");
};

const equipoSeleccionado = computed(() => {
  const jugador = jugadorParaIncidencia.value;
  if (!jugador) return null;

  const idBuscado = jugador.idPersona; // Asegúrate que este sea el campo ID correcto

  // Función auxiliar para buscar dentro de un equipo
  const perteneceAlEquipo = (equipo) => {
    // Verificamos si existe en titulares O en suplentes de este equipo
    const jugadoresTotals = equipo.jugadores.some(
      (j) => j.idPersona === idBuscado,
    );

    return jugadoresTotals;
  };

  // Lógica de decisión: Si está en el Local, devolvemos suplentes locales, sino los visitantes
  if (perteneceAlEquipo(equipoLocal.value)) {
    return equipoLocal.value;
  } else {
    return equipoVisitante.value;
  }
});
const detallePartido = ref([]);
//Cronologia
const fetchCronologia = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/partidos/incidencias`,
      {
        params: {
          idPartido: partido.value.idPartido,
        },
      },
    );
    const data = response.data;
    data.sort((a, b) => b.incidencia.minuto - a.incidencia.minuto);
    detallePartido.value = data;
    return detallePartido.value;
  } catch (error) {
    console.error("Error al obtener la cronología:", error);
  }
};

//Estado arbitro
const mostrarModalArbitro = ref(false);
const cerrarModalArbitro = () => {
  mostrarModalArbitro.value = false;
};
const procesarExitoArbitro = () => {
  mostrarModalArbitro.value = false;
  fetchCronologia();
};
const catalogoGestion = ref([]);
const fetchCatalogoGestion = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/incidencias/catalogo-gestion",
    );
    const data = response.data;
    catalogoGestion.value = data;
    return catalogoGestion.value;
  } catch (error) {
    console.error("Error al obtener el catálogo de gestión:", error);
  }
};
const abrirModal = (jugadorRecibido) => {
  jugadorParaIncidencia.value = jugadorRecibido;
  mostrarModal.value = true;
};

// ... (resto de funciones de cierre y éxito)
</script>

<template>
  <MatchHeader />

  <main class="py-2 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8" v-if="!cargando">
    <div class="lg:col-span-8 space-y-6">
      
      <MatchInfoCard
        :competencia="competencia" 
        :partido="partido" 
        @openArbitroModal="mostrarModalArbitro = true" 
      />

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <TeamHead :equipo="equipoLocal" :isLocal="true" />
        <ResultHead :detalle-partido="detallePartido" :partido="partido" />
        <TeamHead :equipo="equipoVisitante" :isLocal="false" />
      </div>

      <TeamsTabManager
        :equipoLocal="equipoLocal" 
        :equipoVisitante="equipoVisitante" 
        :partido="partido"
        @abrir-modal="abrirModal"
      />
    </div>

    <Cronologia :detallePartido="detallePartido" />
  </main>

  <div v-else class="h-80 flex flex-col gap-3 items-center justify-center">
    <IconLoader class="animate-spin text-[#607AFB]" />
    <span>Obteniendo Partido...</span>
  </div>

  <Teleport to="body">
    <ModalIncidencia v-if="mostrarModal" :jugador="jugadorParaIncidencia" :partidoId="partido.idPartido"
      @close="cerrarModal" @success="procesarExito" :equipo="equipoSeleccionado" />
    <ModalIncidenciaArbitro v-if="mostrarModalArbitro" :partidoId="partido.idPartido" @close="cerrarModalArbitro"
      @success="procesarExitoArbitro" :catalogoGestion="catalogoGestion" />
  </Teleport>
</template>