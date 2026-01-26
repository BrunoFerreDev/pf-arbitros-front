<script setup>
import IncidenciaCard from "./IncidenciaCard.vue";
const { detallePartido } = defineProps({
  detallePartido: {
    type: Array,
    required: true,
  },

});
</script>

<template>
  <div
    class="lg:col-span-4 flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
  >
    <div
      class="p-4 border-b border-slate-200 flex items-center justify-between"
    >
      <h3 class="font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-red-500 text-sm"
          >charging_station</span
        >
        Cronología del Partido
      </h3>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      <IncidenciaCard
        v-for="detalle in detallePartido"
        :key="detalle.idDetallePartido"
        :incidencia="detalle.incidencia"
        :detalle="detalle"
      />
    </div>
    <div class="p-4 bg-slate-50/50 border-t border-slate-200">
      <button
        class="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-slate-500 hover:text-[#607AFB] transition-colors"
      >
        <span class="material-symbols-outlined text-lg">save</span>
        Guardar incidencias
      </button>
    </div>
  </div>
</template>
