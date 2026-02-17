<script setup>
import { ref } from 'vue';
import TableTeam from "./TableTeam.vue";

const props = defineProps(['equipoLocal', 'equipoVisitante', 'partido']);
const emit = defineEmits(['abrir-modal']);

const activeTab = ref("local");

const isEditable = () => {
  const status = props.partido.estado;
  return !['FINALIZADO', 'CANCELADO', 'SUSPENDIDO'].includes(status);
};
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="flex w-full justify-between px-10 border-b">
      <button @click="activeTab = 'local'" 
        :class="activeTab === 'local' ? 'border-[#607AFB] text-[#607AFB]' : 'border-transparent text-slate-500'"
        class="px-6 py-4 font-bold border-b-2 transition-all">
        Local: {{ equipoLocal.nombre }}
      </button>
      <button @click="activeTab = 'visita'" 
        :class="activeTab === 'visita' ? 'border-[#607AFB] text-[#607AFB]' : 'border-transparent text-slate-500'"
        class="px-6 py-4 font-bold border-b-2 transition-all">
        Visitante: {{ equipoVisitante.nombre }}
      </button>
    </div>

    <TableTeam 
      v-if="activeTab === 'local'" 
      :jugadores="equipoLocal.jugadores" 
      :estadoPartido="isEditable()"
      @abrir-modal="j => $emit('abrir-modal', j)" 
    />
    <TableTeam 
      v-else 
      :jugadores="equipoVisitante.jugadores" 
      :estadoPartido="isEditable()"
      @abrir-modal="j => $emit('abrir-modal', j)" 
    />
  </div>
</template>