<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IconLoader } from '@tabler/icons-vue';

// Importamos nuestra lógica separada
import { useMatchData } from '../hooks/useMatchData.js';

// Componentes UI
import MatchHeader from '../components/MatchHeader.vue';
import MatchInfoCard from '../components/MatchInfoCard.vue';
import TeamHead from '../components/TeamHead.vue';
import TeamsTabsManager from '../components/TeamsTabsManager.vue';
import ModalIncidencia from '../components/ModalIncidencia.vue';
import ModalIncidenciaArbitro from '../components/ModalIncidenciaArbitro.vue';
import Cronologia from '../components/Cronologia.vue';
import ResultHead from '../components/ResultHead.vue';
import ModalMessage from '../components/ModalMessage.vue';
import axios from 'axios';

const router = useRouter();
const idPartido = router.currentRoute.value.params.idPartido;

// --- USO DEL COMPOSABLE ---
const {
  cargando,
  partido,
  clubLocal,
  clubVisita,
  jugadoresLocal,
  jugadoresVisitante,
  cronologia,
  catalogoGestion,
  initData,
  fetchCronologia
} = useMatchData(idPartido);

onMounted(() => {

  initData();
});

// --- GESTIÓN DE MODALES Y UI ---
const mostrarModal = ref(false);
const mostrarModalArbitro = ref(false);
const jugadorParaIncidencia = ref(null);

// Lógica de Modales
const abrirModal = (jugadorRecibido) => {
  jugadorParaIncidencia.value = jugadorRecibido;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  jugadorParaIncidencia.value = null;
};

const procesarExito = () => {
  cerrarModal();
  fetchCronologia(); // Recargamos la cronología al guardar
  alert("Incidencia guardada con éxito");
};

const cerrarModalArbitro = () => mostrarModalArbitro.value = false;
const procesarExitoArbitro = () => {
  mostrarModalArbitro.value = false;
  fetchCronologia();
};
const showModal = ref(false);

// --- CORRECCIÓN LÓGICA IMPORTANTE ---
// En tu código original, usabas clubLocal.value dentro del computed, pero clubLocal no existía como ref.
// Ahora accedemos a través del objeto `partido`.
const equipoSeleccionado = computed(() => {
  const jugador = jugadorParaIncidencia.value;
  if (!jugador || !partido.value.clubLocal) return null;

  const idBuscado = jugador.idPersona; // Asegúrate que este ID coincida con tu modelo

  // Buscamos en la lista de jugadores que ya descargamos
  const esLocal = jugadoresLocal.value.some(j => j.idPersona === idBuscado);

  return esLocal ? partido.value.clubLocal : partido.value.clubVisita;
});
const finalizarInforme = async () => {
  console.log(partido.value.idPartido);

  try {
    const response = await axios.post('http://localhost:8080/api/arbitros/partido/finalizar-informe?idPartido=' + partido.value.idPartido, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    showModal.value = false;
    location.reload()
  }
  catch (error) {
    console.log(error);
  }
}
const descargarInforme = () => {
  console.log("Descargar Informe");
}

</script>

<template>
  <MatchHeader :estadoPartido="partido.estado" @finalizarInforme="showModal = true"
    @descargarInforme="descargarInforme" />

  <div v-if="cargando" class="h-80 flex flex-col gap-3 items-center justify-center">
    <IconLoader class="animate-spin text-[#607AFB]" />
    <span>Obteniendo Partido...</span>
  </div>

  <main v-else class="py-2 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 space-y-6">

      <MatchInfoCard :competencia="partido.competenciaDTO" :partido="partido"
        @openArbitroModal="mostrarModalArbitro = true" />

      <div
        class="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <TeamHead :equipo="clubLocal" :isLocal="true" />
        <ResultHead :detalle-partido="cronologia" :partido="partido" />
        <TeamHead :equipo="clubVisita" :isLocal="false" />
      </div>

      <TeamsTabsManager :clubLocal="clubLocal" :clubVisita="clubVisita" :partido="partido"
        :jugadoresLocal="jugadoresLocal" :jugadoresVisitante="jugadoresVisitante" @abrir-modal="abrirModal" />
    </div>

    <Cronologia :detallePartido="cronologia" />
  </main>

  <Teleport to="body">
    <ModalIncidencia v-if="mostrarModal" :jugador="jugadorParaIncidencia" :partidoId="partido?.idPartido"
      :equipo="equipoSeleccionado" @close="cerrarModal" @success="procesarExito" />

    <ModalIncidenciaArbitro v-if="mostrarModalArbitro" :partidoId="partido?.idPartido"
      :catalogoGestion="catalogoGestion" @close="cerrarModalArbitro" @success="procesarExitoArbitro" />
    <div class="z-50 fixed inset-0 bg-black/50 flex items-center justify-center p-4 " v-if="showModal">
      <ModalMessage :showModal="showModal" @closeModal="finalizarInforme" titulo="¿Desea finalizar el informe?"
        :showButton="true" mensaje="No podrá modificar el informe una vez finalizado" errorIcon="warning"
        type="warning" />
    </div>
  </Teleport>
</template>