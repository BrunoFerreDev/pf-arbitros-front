<template>
  <header
    class="flex items-center justify-between px-6 md:px-8 py-6 sticky top-0 bg-[#f5f7f8]/80 backdrop-blur-xl z-10 border-b border-slate-200"
  >
    <!-- Título -->
    <div class="flex flex-col">
      <h2 class="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
        Mis Designaciones
      </h2>
      <p class="text-slate-500 text-sm">
        Tienes 4 partidos programados para esta semana.
      </p>
    </div>
    <!-- Botón hamburguesa mobile -->
    <button
      @click="open = !open"
      class="md:hidden p-2 rounded-lg hover:bg-slate-200 transition"
      aria-label="Abrir menú"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-slate-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Menú mobile desplegable -->
    <div
      v-if="open"
      class="absolute top-full left-0 w-full bg-white border-b border-slate-200 md:hidden shadow-lg"
    >
      <ul class="flex flex-col divide-y text-slate-700">
        <li class="px-6 py-4 hover:bg-slate-100">Inicio</li>
        <li class="px-6 py-4 hover:bg-slate-100">Mi agenda</li>
        <li class="px-6 py-4 hover:bg-slate-100">Mis estadísticas</li>
        <li class="px-6 py-4 hover:bg-slate-100">Mi perfil</li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
</script>
