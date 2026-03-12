<script setup>
import { ref, computed, onMounted } from 'vue';
import TableTeam from "./TableTeam.vue";

const props = defineProps({
  clubLocal: { type: Object, required: true },
  clubVisita: { type: Object, required: true },
  partido: { type: Object, required: true }, // Objeto completo del partido
  jugadoresLocal: { type: Array, default: () => [] },
  jugadoresVisitante: { type: Array, default: () => [] },
  cuerpoTecnicoLocal: { type: Array, default: () => [] },
  cuerpoTecnicoVisitante: { type: Array, default: () => [] }
});
const emit = defineEmits(['abrir-modal']);

const activeTab = ref("local");

// Convertido a Computed para mejor rendimiento y reactividad
const isEditable = computed(() => {
  // Verificamos si existe el estado antes de comprobar
  const estado = props.partido?.partido?.estado || props.partido?.estado;

  if (!estado) return false; // Si no hay estado cargado, no es editable

  const estadosFinalizados = ['FINALIZADO', 'CANCELADO', 'SUSPENDIDO'];
  return !estadosFinalizados.includes(estado);
});
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
    <div class="flex w-full border-b bg-slate-50">
      <button @click="activeTab = 'local'" class="flex-1 px-6 py-4 font-bold text-sm transition-colors border-b-2"
        :class="activeTab === 'local'
          ? 'border-[#607AFB] text-[#607AFB] bg-white'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'">
        {{ clubLocal?.nombre || 'Local' }}
      </button>

      <button @click="activeTab = 'visita'" class="flex-1 px-6 py-4 font-bold text-sm transition-colors border-b-2"
        :class="activeTab === 'visita'
          ? 'border-[#607AFB] text-[#607AFB] bg-white'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'">
        {{ clubVisita?.nombre || 'Visitante' }}
      </button>
    </div>

    <div class="p-4 overflow-auto">
      <TableTeam v-if="activeTab === 'local'" :jugadores="jugadoresLocal.sort((a, b) => a.nroCamiseta - b.nroCamiseta)" :estadoPartido="isEditable"
        :cuerpoTecnico="cuerpoTecnicoLocal" @abrir-modal="(j) => emit('abrir-modal', j)" />

      <TableTeam v-else :jugadores="jugadoresVisitante.sort((a, b) => a.nroCamiseta - b.nroCamiseta)" :estadoPartido="isEditable"
        :cuerpoTecnico="cuerpoTecnicoVisitante" @abrir-modal="(j) => emit('abrir-modal', j)" />
    </div>
  </div>
</template>