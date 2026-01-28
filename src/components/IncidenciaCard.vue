<template>
  <div
    class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-[-20px] before:w-px before:bg-[#2d3a52] last:before:hidden"
  >
    <div
      class="absolute left-[-4px] top-2 size-2 rounded-full bg-[#607AFB] border-2 border-[#1d2636]"
    ></div>
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
      <div class="flex items-center justify-between mb-1">
        <article class="flex items-center gap-2">
          <span class="text-xs font-bold text-[#607AFB]">{{
            incidencia.minuto
          }}</span>
          <p class="text-sm font-bold inline-flex items-center gap-2">
            {{ jugador.nombre + " " + jugador.apellido }}
          </p>
        </article>
        <div class="flex items-center gap-2">
          <span
            alt="Eliminar"
            class="material-symbols-outlined text-sm text-red-500 cursor-pointer"
            >close</span
          >
        </div>
      </div>
      <div class="flex items-center justify-between gap-2 mt-3">
      <div class="flex items-center gap-2">
        <p class="text-xs text-slate-500">{{ incidencia.nombre }}</p>
        <div
          v-if="incidencia.tipo === 'EXPULSION'"
          class="w-3 h-4 bg-red-500 rounded-sm shadow-sm"
          title="Tarjeta Roja"
        ></div>
        <div
          v-if="incidencia.tipo === 'AMONESTACION'"
          class="w-3 h-4 bg-yellow-400 rounded-sm shadow-sm"
          title="Tarjeta Amarilla"
        ></div>
        <span
          class="material-symbols-outlined text-sm text-green-400 rounded-sm"
          v-if="incidencia.tipo === 'GOL'"
          title="Gol"
          >sports_soccer</span
        >
        <IconChevronUp
          v-if="incidencia.tipo === 'SUSTITUCION_INGRESA'"
          class="w-3 h-4 text-green-400 rounded-sm shadow-sm"
          title="Sustitución Ingresa"
        ></IconChevronUp>
        <IconChevronDown
          v-if="incidencia.tipo === 'SUSTITUCION_EGRESA'"
          class="w-3 h-4 text-red-400 rounded-sm shadow-sm"
          title="Sustitución Egresa"
        ></IconChevronDown>
        <span v-if="jugador.tipoPersona == 'ARBITRO'" class="material-symbols-outlined text-primary">sports</span>
      </div>
      <p class="text-xs text-slate-500">{{ club?.nombre || '' }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { IconChevronUp } from "@tabler/icons-vue";
import { IconChevronDown } from "@tabler/icons-vue";

const { incidencia, jugador, club } = defineProps({
  incidencia: {
    type: Object,
    required: true,
  },
  jugador: {
    type: Object,
    required: true,
  },
  club: {
    type: Object,
    required: true,
  },
});
</script>
