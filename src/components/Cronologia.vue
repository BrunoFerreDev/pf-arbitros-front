<script setup>
import { onMounted, ref } from "vue";
import IncidenciaCard from "./IncidenciaCard.vue";
const { detallePartido } = defineProps({
  detallePartido: {
    type: Array,
    required: true,
  },
});
onMounted(() => {
});


</script>

<template>
    <div
      class="lg:col-span-4 flex flex-col max-h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-22"
    >
      <div
        class="p-4 border-b border-slate-200 flex items-center justify-between"
      >
        <h3 class="font-bold flex items-center gap-2 ">
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
          :club="detalle.idClub"
          :jugador="detalle.persona"
        />
      </div>
    </div>
</template>