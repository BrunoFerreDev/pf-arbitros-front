<script setup>
import Cronologia from "../components/Cronologia.vue";
import { ref, onMounted, Teleport, computed } from "vue";
import axios from "axios";
import TeamHead from "../components/TeamHead.vue";
import ResultHead from "../components/ResultHead.vue";
import TableTeam from "../components/TableTeam.vue";
import ModalIncidencia from "../components/ModalIncidencia.vue";
import ModalIncidenciaArbitro from "../components/ModalIncidenciaArbitro.vue";
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
onMounted(async () => {
  fetchPartido();
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
  } catch (error) {
    console.error("Error al obtener las incidencias:", error);
  }
};
const fetchPartido = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/partidos/1");
    const data = response.data;
    fetchIncidencias();
    fetchCatalogoGestion();
    equipoLocal.value = data.clubLocal;
    equipoVisitante.value = data.clubVisitante;
    competencia.value = data.competenciaDTO;
    partido.value = data;
    fetchJugadores();
    fetchCronologia();
  } catch (error) {
    console.error("Error al obtener el partido:", error);
  }
};

onMounted(async () => {
  fetchPartido();
});

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
  } catch (error) {
    console.error("Error al obtener los jugadores:", error);
  }
};

// ESTADO
const mostrarModal = ref(false); // Controla visibilidad
const jugadorParaIncidencia = ref(null); // Guarda al jugador seleccionado
// FUNCIONES
const abrirModal = (jugadorRecibido) => {
  jugadorParaIncidencia.value = jugadorRecibido; // 1. Guardamos al jugador
  mostrarModal.value = true; // 2. Mostramos el modal
};
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

  const idBuscado = jugador.idJugador; // Asegúrate que este sea el campo ID correcto

  // Función auxiliar para buscar dentro de un equipo
  const perteneceAlEquipo = (equipo) => {
    // Verificamos si existe en titulares O en suplentes de este equipo
    const jugadoresTotals = equipo.jugadores.some(
      (j) => j.idJugador === idBuscado,
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
  } catch (error) {
    console.error("Error al obtener el catálogo de gestión:", error);
  }
};
</script>

<template>
  <header
    class="rounded-b-lg border-b border-solid border-slate-200 px-6 py-4 bg-white sticky top-0 z-50"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="size-12 text-[#607AFB]">
          <svg
            fill="none"
            viewbox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <h2 class="text-lg font-bold tracking-tight">Referee Pro Admin</h2>
      </div>
      <nav class="hidden md:flex items-center gap-8">
        <a
          class="text-sm font-medium hover:text-[#607AFB] transition-colors"
          href="#"
          >Panel</a
        >
        <a
          class="text-sm font-medium hover:text-[#607AFB] transition-colors border-b-2 border-[#607AFB] pb-1"
          href="#"
          >Informes</a
        >
        <a
          class="text-sm font-medium hover:text-[#607AFB] transition-colors"
          href="#"
          >Asignaciones</a
        >
        <a
          class="text-sm font-medium hover:text-[#607AFB] transition-colors"
          href="#"
          >Ajustes</a
        >
      </nav>
      <div class="flex items-center gap-4">
        <button
          class="bg-[#607AFB] hover:bg-[#607AFB]/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#607AFB]/20"
        >
          Finalizar Informe del Partido
        </button>
        <div
          class="size-10 rounded-full bg-cover bg-center border-2 border-[#2d3a52]"
          style="
            background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuAxHea1MFbe4BaURJzQ9WASRAJy--CL38GTNr7zT97QgfEB5wQ1oYfBWe7cuKZFQZAJrDz1LRUekEqwssgT3ITKmdcmPnCnTpwJH1rvCunsvmdzH0JrtXXTxKPCTPsa4kILK0mwzVIBvQPEMaLR19a0fBqFLTzs6FMUSMWoAph_Mg_pJeTwt_HzUF6ijNEAuU0eZE8mTy-GaWMeQ9I7vZJluGJYi-Qe1hAglIhmdSWYMPof8mWnU3k-NdzXzMMbk_eRXDqL9mOGIhg&quot;);
          "
        ></div>
      </div>
    </div>
  </header>
  <main class="py-2 grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 space-y-6">
      <div
        class="flex flex-col gap-2 bg-white p-6 rounded-xl border border-slate-200"
      >
        <strong>{{ competencia.nombre }}</strong>
        <div class="flex flex-col gap-2">
          <strong class="text-sm font-medium text-slate-500"
            >Fecha Numero: {{ partido.fechaTorneo }}</strong
          >
          <strong class="text-sm font-medium text-slate-500">
            Programado para el dia
            {{
              new Date(partido.fecha).toLocaleDateString() +
              " " +
              new Date(partido.hora).toLocaleTimeString()
            }}
          </strong>
        </div>
        <button
          @click="mostrarModalArbitro = true"
          class="inline-flex items-center gap-1 px-4 py-2 mt-4 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-blue-400 transition-all shadow-sm"
        >
          <span class="material-symbols-outlined text-sm">edit_note</span>
          Cargar Evento
        </button>
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <TeamHead :equipo="equipoLocal" :isLocal="true" />
        <ResultHead :detalle-partido="detallePartido" :partido="partido" />
        <TeamHead :equipo="equipoVisitante" :isLocal="false" />
      </div>
      <div
        class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div class="flex w-full justify-between px-10">
          <button
            @click.prevent="activeTab = 'local'"
            :class="
              activeTab === 'local'
                ? 'border-[#607AFB] text-[#607AFB]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            "
            class="flex items-center gap-2 px-6 py-4 font-bold whitespace-nowrap border-b-2 transition-colors duration-200"
          >
            Club Local : {{ equipoLocal.nombre }}
          </button>
          <button
            @click.prevent="activeTab = 'visita'"
            :class="
              activeTab === 'visita'
                ? 'border-[#607AFB] text-[#607AFB]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            "
            class="flex items-center gap-2 px-6 py-4 font-bold whitespace-nowrap border-b-2 transition-colors duration-200"
          >
            Club Visitante : {{ equipoVisitante.nombre }}
          </button>
        </div>
        <TableTeam
          v-if="activeTab === 'local'"
          :jugadores="equipoLocal.jugadores"
          @abrir-modal="abrirModal"
        />
        <TableTeam
          v-else
          :jugadores="equipoVisitante.jugadores"
          @abrir-modal="abrirModal"
        />
      </div>
    </div>
    <Cronologia :detallePartido="detallePartido" />
  </main>
  <div class="lg:hidden fixed bottom-6 right-6">
    <button
      class="size-14 rounded-full bg-[#607AFB] text-white shadow-xl shadow-[#607AFB]/40 flex items-center justify-center"
    >
      <span class="material-symbols-outlined text-3xl">check</span>
    </button>
  </div>
  <Teleport to="body">
    <ModalIncidencia
      v-if="mostrarModal"
      :jugador="jugadorParaIncidencia"
      :partidoId="partido.idPartido"
      @close="cerrarModal"
      @success="procesarExito"
      :equipo="equipoSeleccionado"
    />
  </Teleport>
  <Teleport to="body">
    <ModalIncidenciaArbitro
      v-if="mostrarModalArbitro"
      :partidoId="partido.idPartido"
      @close="cerrarModalArbitro"
      @success="procesarExitoArbitro"
      :catalogoGestion="catalogoGestion"
    />
  </Teleport>
</template>
