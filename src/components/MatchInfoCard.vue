<script setup>
defineProps(['competencia', 'partido']);
defineEmits(['openArbitroModal']);
</script>

<template>
  <div class="flex flex-col gap-2 bg-white p-6 rounded-xl border border-slate-200">
    <strong>{{ competencia.nombre }}</strong>
    <div class="flex flex-col gap-2">
      <strong class="text-sm font-medium text-slate-500">Fecha Numero: {{ partido.fechaTorneo }}</strong>
      <strong class="text-sm font-medium text-slate-500">
        Programado: {{ new Date(partido.fecha).toLocaleDateString() }} {{ new Date(partido.hora).toLocaleTimeString() }}
      </strong>

    </div>
    <button @click="$emit('openArbitroModal')" v-if="partido.estado !== 'FINALIZADO'"
      class="inline-flex items-center gap-1 px-4 py-2 mt-4 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all">
      <span class="material-symbols-outlined text-sm">edit_note</span>
      Cargar Evento Árbitro
    </button>
    <span v-else
      class="inline-flex items-center gap-1 px-4 py-2 mt-4 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all">
      No se permite registrar eventos nuevos, partido finalizado
    </span>
  </div>
</template>