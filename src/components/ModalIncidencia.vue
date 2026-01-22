<template>
  <div
    class="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-4"
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
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 border-2 border-blue-500/20"
            :style="{
              backgroundImage: `url(${jugador.foto || 'https://via.placeholder.com/150'})`,
            }"
          ></div>
          <div class="flex flex-col justify-center">
            <p class="text-[#111418] text-lg font-bold leading-tight">
              {{ jugador.apellido }}, {{ jugador.nombre }}
            </p>
            <p class="text-[#60758a] text-sm font-medium">
              DNI: {{ new Intl.NumberFormat("es-AR").format(jugador.dni) }}
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
                  ? 'bg-white  shadow-sm text-blue-600 '
                  : 'text-[#60758a] hover:text-slate-800'
              "
            >
              <span class="truncate">{{ tipo.label }}</span>
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
                class="w-full rounded-lg border-slate-200 focus:ring-blue-500 h-12 px-4"
                placeholder="Ej: 42"
                type="number"
              />
              <span
                class="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                >' min</span
              >
            </div>
          </div>

          <div
            v-if="form.tipoIncidencia === 'GOL'"
            class="flex flex-col animate-in slide-in-from-left-2"
          ></div>
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
            v-model="form.idJugadorEntra"
            class="w-full rounded-lg border-slate-200 border h-12 px-3"
          >
            <option :value="null" disabled>Seleccione un suplente...</option>
            <option
              v-for="suplente in props.suplentes"
              :key="suplente.id"
              :value="suplente.id"
            >
              In: {{ suplente.apellido }}, {{ suplente.nombre }}
            </option>
          </select>
        </div>

        <div class="flex flex-col" v-if="form.tipoIncidencia !== 'CAMBIO'">
          <label class="text-[#111418] text-sm font-semibold pb-2"
            >Observaciones</label
          >
          <textarea
            v-model="form.descripcion"
            class="w-full min-h-[80px] rounded-lg border-slate-200 border p-3 text-sm resize-none"
            placeholder="Ej: Gol de tiro libre, conducta antideportiva..."
          ></textarea>
        </div>

        <div
          v-if="errores"
          class="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100"
        >
          {{ errores }}
        </div>
      </div>

      <div
        class="p-6 bg-slate-50 border-t border-slate-200 flex gap-3 justify-end"
      >
        <button
          @click.prevent="cerrar"
          :disabled="cargando"
          class="px-5 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          @click.prevent="guardarIncidencia"
          :disabled="cargando"
          class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <span v-if="cargando" class="animate-spin mr-2">...</span>
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
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios"; // O tu cliente de API personalizado

const props = defineProps({
  // Jugador al que se le carga la incidencia (viene de la fila clickeada)
  jugador: {
    type: Object,
    required: true,
  },
  // ID del partido actual para la relación en BD
  idPartido: {
    type: [Number, String],
    required: true,
  },
  suplentes: {
    type: Array,
    required: true,
  },
  equipo: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "success"]);

// Estado del formulario de incidencia
const form = reactive({
  tipoIncidencia: "GOL", // GOL, AMARILLA, ROJA, CAMBIO, etc.
  minuto: null,
  descripcion: "",
  idJugador: props.jugador.idPersona,
  idPartido: props.idPartido,
});

const cargando = ref(false);
const errores = ref(null);

// Tipos de incidencias (podrías traerlos de un Enum en el Backend si prefieres)
const tiposDisponibles = [
  { value: "GOL", label: "Gol", icon: "sports_soccer" },
  {
    value: "AMARILLA",
    label: "Tarjeta Amarilla",
    icon: "style",
    color: "text-yellow-500",
  },
  {
    value: "ROJA",
    label: "Tarjeta Roja",
    icon: "style",
    color: "text-red-500",
  },
  {
    value: "CAMBIO",
    label: "Cambio / Sustitución",
    icon: "published_with_changes",
  },
];

const guardarIncidencia = async () => {
  cargando.value = true;
  errores.value = null;

  try {
    // URL basada en tu estructura de Spring Boot
    await axios.post("/api/incidencias", form);

    // Avisar al padre que todo salió bien para cerrar modal y refrescar
    emit("success");
    emit("close");
  } catch (error) {
    console.error("Error al guardar incidencia:", error);
    errores.value =
      error.response?.data?.message || "Error al conectar con el servidor";
  } finally {
    cargando.value = false;
  }
};

const cerrar = () => {
  emit("close");
};
watch(
  () => form.tipoIncidencia,
  (nuevoValor) => {
    if (nuevoValor === "CAMBIO") {
      form.descripcion = ""; // Limpia la observación si cambia a sustitución
    }
  },
);
</script>
<style scoped>
input {
  border: 1px solid #ccc;
}
</style>
