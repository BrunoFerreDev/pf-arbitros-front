<template>
  <section class="border border-slate-200 rounded-2xl p-8 flex flex-wrap gap-8 justify-between bg-white">
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium">Partidos esta Temporada</p>
      <p class="text-3xl font-black">{{ stats.partidosEstaTemporada }}</p>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium">Tarjetas Amarillas</p>
      <p class="text-3xl font-black">{{ stats.tarjetasAmarillas }}</p>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium">Tarjetas Rojas</p>
      <p class="text-3xl font-black">{{ stats.tarjetasRojas }}</p>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium">Distancia Media</p>
      <p class="text-3xl font-black">{{ stats.distanciaMedia }}km</p>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium">Calificación Media</p>
      <div class="flex items-center">
        <p class="text-3xl font-black">{{ stats.calificacionMedia }}</p>
        <span class="material-symbols-outlined text-amber-500 fill-icon">star</span>
      </div>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
