<template>
  <div class="flex items-center gap-6 flex-1 justify-start">
    <div
      class="size-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"
    >
      <span class="material-symbols-outlined text-3xl text-slate-400"
        >shield</span
      >
    </div>
    <div>
      <p class="text-sm font-medium text-slate-500">Equipo Visitante</p>
      <h3 class="text-xl font-bold">{{ equipo.nombre }}</h3>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  equipo: Object,
});
</script>
