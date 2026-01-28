<template>
  <div
    class="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-4 bg-gray-900/50"
  >
    <div
      class="w-full max-w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200"
    >
      <div class="border-b border-slate-200 bg-white">
        <div class="flex items-center justify-between px-6 py-4">
          <h2
            class="text-[#111418] text-[22px] font-bold leading-tight tracking-tight"
          >
            Registrar Incidencia
          </h2>
          <button
            @click.prevent="cerrar"
            class="text-[#60758a] hover:text-red-500 transition-colors"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div class="px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div class="flex items-center gap-4">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 border-2 border-blue-500/20 shadow-sm"
            :style="{
              backgroundImage: `url(${jugador.foto || 'https://via.placeholder.com/150'})`,
            }"
          ></div>
          <div class="flex flex-col justify-center">
            <p class="text-[#111418] text-lg font-bold leading-tight">
              {{ jugador.apellido }}, {{ jugador.nombre }}
            </p>
            <p class="text-[#60758a] text-sm font-medium">
              DNI: {{ new Intl.NumberFormat("es-AR").format(jugador.dni || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
        <div class="flex flex-col gap-2">
          <p class="text-[#111418] text-base font-semibold">
            Tipo de incidencia
          </p>
          <div
            class="flex h-12 w-full items-center justify-center rounded-lg bg-[#f0f2f5] p-1"
          >
            <label
              v-for="tipo in tiposDisponibles"
              :key="tipo.value"
              class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium transition-all"
              :class="
                form.tipoIncidencia === tipo.value
                  ? 'bg-white shadow-sm text-blue-600 font-bold'
                  : 'text-[#60758a] hover:text-slate-800'
              "
            >
              <span class="flex items-center gap-2">
                {{ tipo.label }}
              </span>
              <input
                class="hidden"
                type="radio"
                :value="tipo.value"
                v-model="form.tipoIncidencia"
              />
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="text-[#111418] text-sm font-semibold pb-2"
              >Minuto</label
            >
            <div class="relative">
              <input
                v-model="form.minuto"
                class="w-full rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 px-4 outline-none transition-all"
                placeholder="Ej: 42"
                type="number"
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium"
                >' min</span
              >
            </div>
          </div>

          <div class="flex flex-col" v-if="form.tipoIncidencia !== 'CAMBIO'">
            <label class="text-[#111418] text-sm font-semibold pb-2"
              >Motivo / Detalle</label
            >
            <div class="relative">
              <select
                v-model="form.idIncidenciaCatalogo"
                class="w-full rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 px-4 bg-white outline-none transition-all"
              >
                <option :value="null">Seleccione...</option>
                <option
                  v-for="incidencia in motivosFiltrados"
                  :key="incidencia.idIncidencia"
                  :value="incidencia.idIncidencia"
                >
                  {{ incidencia.nombre }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div
          v-if="form.tipoIncidencia === 'CAMBIO'"
          class="flex flex-col p-4 bg-blue-50 rounded-xl border border-blue-200 animate-in zoom-in-95"
        >
          <label
            class="text-blue-800 text-sm font-bold pb-2 flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-xl">swap_horiz</span>
            Jugador que ingresa
          </label>
          <select
            v-model="form.jugadorEntrante"
            class="w-full rounded-lg border-slate-200 border h-12 px-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option :value="null">Seleccione un suplente...</option>
            <option
              v-for="suplente in props.equipo.jugadores"
              :key="suplente.idJugador"
              :value="suplente.idJugador"
            >
              (#{{ suplente.dorsal }}) {{ suplente.apellido }},
              {{ suplente.nombre }}
            </option>
          </select>
        </div>

        <div class="flex flex-col" v-if="form.tipoIncidencia !== 'CAMBIO'">
          <label class="text-[#111418] text-sm font-semibold pb-2"
            >Observaciones</label
          >
          <textarea
            v-model="form.descripcion"
            class="w-full min-h-[80px] rounded-lg border border-slate-200 p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Detalles adicionales..."
          ></textarea>
        </div>

        <div
          v-if="errores"
          class="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-sm">error</span>
          {{ errores }}
        </div>
      </div>

      <div
        class="p-6 bg-slate-50 border-t border-slate-200 flex gap-3 justify-end"
      >
        <button
          @click.prevent="cerrar"
          :disabled="cargando"
          class="px-5 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          @click.prevent="guardarIncidencia"
          :disabled="cargando"
          class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <span
            v-if="cargando"
            class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
          ></span>
          <span v-else class="material-symbols-outlined text-xl"
            >check_circle</span
          >
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

  // 1. CAMBIO AQUÍ: El padre te envía 'partidoId', no 'idPartido'
  partidoId: {
    type: [Number, String],
    required: true,
  },

  suplentes: { type: Array, required: true },
  equipo: { type: [Object, String], required: true }, // La corrección anterior
});
const emit = defineEmits(["close", "success"]);
const incidenciasDisponibles = ref([]);

const form = reactive({
  tipoIncidencia: "GOL",
  minuto: null,
  descripcion: "",
  idIncidenciaCatalogo: null,
  idJugador: props.jugador.idJugador,
  idPartido: props.partidoId, // 2. CAMBIO AQUÍ: Usamos 'partidoId' en lugar de 'idPartido'
  jugadorEntrante: null,
});

const cargando = ref(false);
const errores = ref(null);

// ==========================================
// 1. MAPEO BASADO EN TU NUEVO JSON
// ==========================================
// Las claves coinciden con la propiedad "tipo" del JSON
const mapaTipoIncidencia = {
  GOL: ["GOL", "GOL_PENAL"], // Agrupa 'Gol', 'Gol en Contra', 'Gol de Penal' y definiciones
  AMARILLA: ["AMONESTACION"],
  ROJA: ["EXPULSION"],
  CAMBIO: ["SUSTITUCION_EGRESA", "SUSTITUCION_INGRESA"],
};

// ==========================================
// 2. FILTRADO COMPUTADO
// ==========================================
const motivosFiltrados = computed(() => {
  const tiposBuscados = mapaTipoIncidencia[form.tipoIncidencia];
  if (!tiposBuscados) return [];

  return incidenciasDisponibles.value.filter((incidencia) =>
    // Nota: en tu JSON la propiedad es 'tipo', no 'tipo_incidencia'
    tiposBuscados.includes(incidencia.tipo),
  );
});

// TABS VISUALES
const tiposDisponibles = [
  { value: "GOL", label: "Gol" },
  { value: "AMARILLA", label: "Amarilla" },
  { value: "ROJA", label: "Roja" },
  { value: "CAMBIO", label: "Cambio" },
];

const guardarIncidencia = async () => {
  cargando.value = true;
  errores.value = null;

  // 1. Validaciones básicas comunes
  if (!form.minuto) {
    errores.value = "Por favor ingrese el minuto.";
    cargando.value = false;
    return;
  }

  try {
    const url = `http://localhost:8080/api/incidencias/${props.partidoId}/cargar-incidencia`;
    // ==========================================
    // LÓGICA ESPECÍFICA PARA CAMBIOS (2 PETICIONES)
    // ==========================================
    if (form.tipoIncidencia === "CAMBIO") {
      // Validación extra para cambio: Debe haber un jugador entrante
      if (!form.jugadorEntrante) {
        throw new Error("Debes seleccionar el jugador que ingresa.");
      }

      // Buscamos dinámicamente los IDs del catálogo para asegurar cuál es cuál
      const motivoSalida = incidenciasDisponibles.value.find(
        (i) => i.tipo === "SUSTITUCION_EGRESA",
      );
      const motivoEntrada = incidenciasDisponibles.value.find(
        (i) => i.tipo === "SUSTITUCION_INGRESA",
      );

      if (!motivoSalida || !motivoEntrada) {
        throw new Error(
          "No se encontraron los motivos de sustitución en el catálogo.",
        );
      }

      // Preparamos las dos promesas (peticiones)
      const peticionSalida = axios.post(url, {
        idIncidencia: motivoSalida.idIncidencia,
        minuto: form.minuto,
        idPersona: props.jugador.idJugador, // El que sale (el del prop)
      });

      const peticionEntrada = axios.post(url, {
        idIncidencia: motivoEntrada.idIncidencia,
        minuto: form.minuto,
        idPersona: form.jugadorEntrante, // El que entra (del select)
      });

      // Ejecutamos ambas al mismo tiempo
      await Promise.all([peticionSalida, peticionEntrada]);
    } else {
      // ==========================================
      // LÓGICA ESTÁNDAR (GOL, AMARILLA, ROJA)
      // ==========================================
      if (!form.idIncidenciaCatalogo) {
        throw new Error("Por favor seleccione el motivo específico.");
      }

      await axios.post(url, {
        idIncidencia: form.idIncidenciaCatalogo,
        minuto: form.minuto,
        idPersona: form.idJugador,
      });
    }

    // Éxito
    emit("success");
    emit("close");
    location.reload();
  } catch (error) {
    console.error("Error:", error);
    // Si lanzamos un error manual (throw new Error), viene en error.message
    // Si es de axios, viene en error.response...
    errores.value =
      error.response?.data?.message ||
      error.message ||
      "Error al procesar la solicitud";
  } finally {
    cargando.value = false;
  }
};
const cerrar = () => {
  emit("close");
};

const fetchIncidenciasDisponibles = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/incidencias/obtener-disponibles",
    );
    // Asignamos la respuesta tal cual viene del JSON
    incidenciasDisponibles.value = response.data;
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    errores.value = "No se pudieron cargar los motivos de incidencia.";
  }
};

// Lógica especial al cambiar de Tab
watch(
  () => form.tipoIncidencia,
  (nuevoTipo) => {
    form.idIncidenciaCatalogo = null;
    form.descripcion = "";
    form.jugadorEntrante = null;
    errores.value = null;

    // Opcional: Si es CAMBIO, podrías autoseleccionar "Sustitución: Egreso" si lo deseas
    if (nuevoTipo === "CAMBIO" && incidenciasDisponibles.value.length > 0) {
      // Buscamos el ID que corresponde a Egreso (jugador sale)
      const egreso = incidenciasDisponibles.value.find(
        (i) => i.tipo === "SUSTITUCION_EGRESA",
      );
      if (egreso) form.idIncidenciaCatalogo = egreso.idIncidencia;
    }
  },
);

onMounted(() => {
  fetchIncidenciasDisponibles();
});
</script>

<style scoped>
.animate-in {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes zoom-in {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
</style>
