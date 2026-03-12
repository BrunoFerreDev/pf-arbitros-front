<script setup>
import { IconShield } from '@tabler/icons-vue';

// Definimos props con tipos para mejor validación
const props = defineProps({
  equipo: {
    type: Object,
    default: () => ({}) // Valor por defecto para evitar errores si es null
  },
  isLocal: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="flex items-center gap-6 flex-1"
    :class="isLocal ? 'justify-start' : 'justify-end flex-row-reverse text-right'">
    <div class="size-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
      <img :src="equipo?.escudo" alt="Escudo del equipo" class="w-full h-full object-contain rounded-lg">
    </div>

    <div>
      <p class="text-sm font-medium text-slate-500">
        Equipo {{ isLocal ? 'Local' : 'Visitante' }}
      </p>
      <h3 class="text-xl font-bold text-slate-800">
        {{ equipo?.nombre || 'Cargando...' }}
      </h3>
    </div>
  </div>
</template>