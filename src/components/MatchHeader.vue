<template>
  <header class="rounded-b-lg border-b border-solid border-slate-200 px-6 py-4 bg-white sticky top-0 z-50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="size-12 text-[#607AFB] cursor-pointer" @click="$router.back()">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
              d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
              fill="currentColor" fill-rule="evenodd"></path>
          </svg>
        </div>
        <h2 class="text-lg font-bold tracking-tight">Liga Regional de Puerto Rico</h2>
      </div>
      <h4 class="text-md font-medium text-slate-800">Panel de Información del Partido</h4>
      <div class="flex items-center gap-4">
        <button v-if="props.estadoPartido === 'ABIERTO'" @click.prevent="emit('finalizarInforme')"
          class="inline-flex items-center gap-2 bg-[#0a923c]  text-white py-2 px-4 cursor-pointer hover:bg-[#0a923c]/80 rounded-lg text-sm font-bold ">
          <span class="material-symbols-outlined">check </span>
          Finalizar Informe
        </button>
        <button v-else-if="props.estadoPartido === 'FINALIZADO'" @click.prevent="emit('descargarInforme')"
          class="inline-flex items-center gap-2 bg-[#607AFB]  text-white py-2 px-4 cursor-pointer hover:bg-[#607AFB]/80 rounded-lg text-sm font-bold ">
          <span class="material-symbols-outlined">download </span>
          Descargar Informe
        </button>
        <div class="size-10 rounded-full bg-cover bg-center border-2 border-[#2d3a52]"
          style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxHea1MFbe4BaURJzQ9WASRAJy--CL38GTNr7zT97QgfEB5wQ1oYfBWe7cuKZFQZAJrDz1LRUekEqwssgT3ITKmdcmPnCnTpwJH1rvCunsvmdzH0JrtXXTxKPCTPsa4kILK0mwzVIBvQPEMaLR19a0fBqFLTzs6FMUSMWoAph_Mg_pJeTwt_HzUF6ijNEAuU0eZE8mTy-GaWMeQ9I7vZJluGJYi-Qe1hAglIhmdSWYMPof8mWnU3k-NdzXzMMbk_eRXDqL9mOGIhg')">
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
const props = defineProps({
  estadoPartido: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  'finalizarInforme',
  'descargarInforme'
]);
</script>