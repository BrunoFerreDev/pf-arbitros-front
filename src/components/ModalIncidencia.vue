<template>
  <div class="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-4 bg-gray-900/50">
    <div class="w-full max-w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
      
      <div class="border-b border-slate-200 bg-white">
        <div class="flex items-center justify-between px-6 py-4">
          <h2 class="text-[#111418] text-[22px] font-bold">Registrar Incidencia</h2>
          <button @click.prevent="cerrar" class="text-[#60758a] hover:text-red-500 transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div class="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div class="flex items-center gap-4">
          <img 
            :src="jugador.foto || 'https://via.placeholder.com/150'" 
            class="h-16 w-16 rounded-full border-2 border-blue-500/20 object-cover"
          />
          <div>
            <p class="text-[#111418] text-lg font-bold">{{ jugador.apellido }}, {{ jugador.nombre }}</p>
            <p class="text-[#60758a] text-sm">DNI: {{ formatDNI(jugador.dni) }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
        <div class="flex flex-col gap-2">
          <p class="text-[#111418] text-base font-semibold">Tipo de incidencia</p>
          <div class="flex h-12 w-full items-center justify-center rounded-lg bg-[#f0f2f5] p-1">
            <label v-for="tipo in tiposDisponibles" :key="tipo.value"
              class="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-sm font-medium transition-all"
              :class="form.tipoIncidencia === tipo.value ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-[#60758a] hover:text-slate-800'">
              {{ tipo.label }}
              <input class="hidden" type="radio" :value="tipo.value" v-model="form.tipoIncidencia" />
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="text-[#111418] text-sm font-semibold pb-2">Minuto</label>
            <div class="relative">
              <input v-model="form.minuto" type="number" class="w-full rounded-lg border border-slate-200 h-12 px-4 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: 42" />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">' min</span>
            </div>
          </div>

          <div class="flex flex-col" v-if="form.tipoIncidencia !== 'CAMBIO'">
            <label class="text-[#111418] text-sm font-semibold pb-2">Motivo / Detalle</label>
            <select v-model="form.idIncidenciaCatalogo" class="w-full rounded-lg border border-slate-200 h-12 px-4 bg-white outline-none focus:ring-2 focus:ring-blue-500">
              <option :value="null">Seleccione...</option>
              <option v-for="incidencia in motivosFiltrados" :key="incidencia.idIncidencia" :value="incidencia.idIncidencia">
                {{ incidencia.nombre }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="form.tipoIncidencia === 'CAMBIO'" class="flex flex-col p-4 bg-blue-50 rounded-xl border border-blue-200 animate-in zoom-in-95">
          <label class="text-blue-800 text-sm font-bold pb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-xl">swap_horiz</span>
            Jugador que ingresa
          </label>
          <select v-model="form.jugadorEntrante" class="w-full rounded-lg border-slate-200 border h-12 px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">Seleccione un jugador...</option>
            <option v-for="otroJugador in listaParaCambio" :key="otroJugador.idPersona" :value="otroJugador.idPersona">
              (#{{ otroJugador.dorsal || 'S/N' }}) {{ otroJugador.apellido }}, {{ otroJugador.nombre }}
            </option>
          </select>
        </div>

        <div class="flex flex-col" v-if="form.tipoIncidencia !== 'CAMBIO'">
          <label class="text-[#111418] text-sm font-semibold pb-2">Observaciones</label>
          <textarea v-model="form.descripcion" class="w-full min-h-[80px] rounded-lg border border-slate-200 p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detalles adicionales..."></textarea>
        </div>

        <div v-if="errores" class="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">error</span>
          {{ errores }}
        </div>
      </div>

      <div class="p-6 bg-slate-50 border-t border-slate-200 flex gap-3 justify-end">
        <button @click.prevent="cerrar" :disabled="cargando" class="px-5 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-50">
          Cancelar
        </button>
        <button @click.prevent="guardarIncidencia" :disabled="cargando" class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
          <span v-if="cargando" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          <span v-else class="material-symbols-outlined text-xl">check_circle</span>
          {{ cargando ? "Guardando..." : "Registrar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import axios from "axios";

const props = defineProps({
  jugador: { type: Object, required: true },
  partidoId: { type: [Number, String], required: true },
  equipo: { type: Object, required: true }, // Objeto del equipo que contiene la lista .jugadores
});

const emit = defineEmits(["close", "success"]);

// Estado
const incidenciasDisponibles = ref([]);
const cargando = ref(false);
const errores = ref(null);

const form = reactive({
  tipoIncidencia: "GOL",
  minuto: null,
  descripcion: "",
  idIncidenciaCatalogo: null,
  idPersona: props.jugador.idPersona,
  jugadorEntrante: null,
});

// Tipos de UI
const tiposDisponibles = [
  { value: "GOL", label: "Gol" },
  { value: "AMARILLA", label: "Amarilla" },
  { value: "ROJA", label: "Roja" },
  { value: "CAMBIO", label: "Cambio" },
];

// Mapeo para filtrar el catálogo que viene de la API
const mapaTipoIncidencia = {
  GOL: ["GOL", "GOL_PENAL", "GOL_CONTRA"],
  AMARILLA: ["AMONESTACION"],
  ROJA: ["EXPULSION"],
  CAMBIO: ["SUSTITUCION_EGRESA", "SUSTITUCION_INGRESA"],
};

// Computado: Filtra los motivos del catálogo según el Tab seleccionado
const motivosFiltrados = computed(() => {
  const tiposBuscados = mapaTipoIncidencia[form.tipoIncidencia];
  if (!tiposBuscados) return [];
  return incidenciasDisponibles.value.filter(i => tiposBuscados.includes(i.tipo));
});

// Computado: Lista de jugadores del equipo EXCLUYENDO al que ya seleccionamos
const listaParaCambio = computed(() => {
  if (!props.equipo || !props.equipo.jugadores) return [];
  return props.equipo.jugadores.filter(j => j.idPersona !== props.jugador.idPersona);
});

const formatDNI = (dni) => {
  return new Intl.NumberFormat("es-AR").format(dni || 0);
};

const fetchIncidenciasDisponibles = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/incidencias/obtener-disponibles");
    incidenciasDisponibles.value = response.data;
  } catch (error) {
    errores.value = "Error al cargar catálogo de incidencias.";
  }
};

const guardarIncidencia = async () => {
  console.log(form);
  
  if (!form.minuto) {
    errores.value = "El minuto es obligatorio.";
    return;
  }

  cargando.value = true;
  errores.value = null;

  try {
    const url = `http://localhost:8080/api/incidencias/${props.partidoId}/cargar-incidencia`;

    if (form.tipoIncidencia === "CAMBIO") {
      if (!form.jugadorEntrante) throw new Error("Seleccione quién ingresa.");

      const motSalida = incidenciasDisponibles.value.find(i => i.tipo === "SUSTITUCION_EGRESA");
      const motEntrada = incidenciasDisponibles.value.find(i => i.tipo === "SUSTITUCION_INGRESA");

      await Promise.all([
        axios.post(url, { idIncidencia: motSalida.idIncidencia, minuto: form.minuto, idPersona: props.jugador.idPersona }),
        axios.post(url, { idIncidencia: motEntrada.idIncidencia, minuto: form.minuto, idPersona: form.jugadorEntrante })
      ]);
    } else {
      if (!form.idIncidenciaCatalogo) throw new Error("Seleccione el motivo.");
      
      await axios.post(url, {
        idIncidencia: form.idIncidenciaCatalogo,
        minuto: form.minuto,
        idPersona: props.jugador.idPersona,
        observacion: form.descripcion
      });
    }

    emit("success"); // Notifica al padre para refrescar cronología/marcador
    cerrar();
  } catch (error) {
    errores.value = error.response?.data?.message || error.message || "Error al guardar";
  } finally {
    cargando.value = false;
  }
};

const cerrar = () => emit("close");

watch(() => form.tipoIncidencia, () => {
  form.idIncidenciaCatalogo = null;
  form.jugadorEntrante = null;
  errores.value = null;
});

onMounted(fetchIncidenciasDisponibles);
</script>