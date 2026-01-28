<template>
  <div class="flex flex-col items-center px-8 border-x border-slate-200">
    <div class="flex items-center gap-4">
      <span
        class="text-5xl font-black tabular-nums"
        :class="
          marcador.local > marcador.visitante
            ? 'font-bold'
            : 'font-bold text-slate-400'
        "
        >{{ marcador.local }}</span
      >
      <span class="text-2xl font-light text-slate-400">-</span>
      <span
        class="text-5xl font-black tabular-nums"
        :class="
          marcador.visitante > marcador.local
            ? 'font-bold'
            : 'font-bold text-slate-400'
        "
        >{{ marcador.visitante }}</span
      >
    </div>
    <div
      class="mt-2 flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full"
    >
      <span class="material-symbols-outlined text-sm animate-pulse">timer</span>
      <span class="text-sm font-bold">00:00</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Definimos las props. Necesitamos 'partido' para saber el ID del club local.
const props = defineProps({
  detallePartido: {
    type: Array,
    default: () => [],
  },
  partido: {
    type: Object,
    required: true,
  },
});

// Usamos computed: Vue recalcula esto automáticamente si cambian los props
const marcador = computed(() => {
  let golesLocal = 0;
  let golesVisitante = 0;

  // 1. Obtenemos el ID del Local desde la prop 'partido'
  // Ajusta '.idClub' si en tu objeto partido el ID tiene otro nombre
  const idLocal =
    props.partido?.clubLocal?.idClub || props.partido?.equipoLocal?.idClub;

  if (!idLocal) {
    // Si aún no cargó el partido, retornamos 0-0 para evitar errores
    return { local: 0, visitante: 0 };
  }

  // 2. Recorremos el array de incidencias
  props.detallePartido.forEach((item) => {
    // Verificamos si es GOL (Asegúrate que en tu BD sea "GOL" o "Gol")
    if (
      item.incidencia?.tipo.includes("GOL") ||
      item.incidencia?.tipo.includes("GOL_PENAL")
    ) {
      // Obtenemos el ID del club que hizo el gol
      const idClubAnotador = item.club?.idClub;

      if (idClubAnotador === idLocal) {
        golesLocal++;
      } else {
        golesVisitante++;
      }
    }
  });

  return {
    local: golesLocal,
    visitante: golesVisitante,
  };
});
</script>
