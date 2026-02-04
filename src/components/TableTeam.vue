<template>
  <div class="overflow-x-auto mt-5 border border-slate-200 rounded-lg">
    <table class="w-full text-left border-collapse" :class="!estadoPartido ? 'pointer-events-none opacity-80' : ''">
      <thead>
        <tr class="border-b border-slate-200 bg-slate-100">
          <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 w-16 text-center">#</th>
          <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600">Jugador</th>
          <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600">DNI / F.Identificación</th>
          <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 text-right">Acciones</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100 bg-white">
        <tr v-for="(jugador, index) in jugadores" :key="jugador.idPersona || index"
          class="hover:bg-slate-50 transition-colors group">
          
          <td class="py-4 px-6 text-blue-700 font-black text-center text-lg">
            {{ index + 1 }}
          </td>

          <td class="py-4 px-6">
            <div class="flex items-center gap-3">
              <img :src="jugador.foto || 'https://i.pravatar.cc/150?img=3'"
                class="size-9 rounded-full bg-slate-200 border border-slate-200 shrink-0 object-cover" />
              <div>
                <p class="font-bold text-slate-900 text-sm uppercase leading-tight">
                  {{ jugador.apellido }}
                </p>
                <p class="text-xs text-slate-500">{{ jugador.nombre }}</p>
              </div>
            </div>
          </td>

          <td class="py-4 px-6">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border border-slate-200 bg-white">
              {{ formatDNI(jugador.dni) }}
            </span>
          </td>

          <td class="py-3 px-6 text-right">
            <button 
              v-if="estadoPartido"
              @click.prevent="manejarClickIncidencia(jugador)" 
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all"
            >
              <span class="material-symbols-outlined text-sm">edit_note</span>
              Incidencia
            </button>
            <span v-else class="text-xs text-slate-400 italic">Lectura</span>
          </td>
        </tr>

        <tr v-if="jugadores.length === 0">
          <td colspan="4" class="py-10 text-center text-slate-400">
            No hay jugadores cargados en este equipo.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  // Ahora es un simple Array
  jugadores: {
    type: Array,
    required: true,
    default: () => [],
  },
  estadoPartido: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(["abrir-modal"]);

const formatDNI = (dni) => {
  if (!dni) return "N/A";
  return new Intl.NumberFormat("es-AR").format(dni);
};

const manejarClickIncidencia = (jugador) => {
  // Ahora "jugador" es garantizadamente el objeto individual del array
  console.log("Emitiendo incidencia para:", jugador.apellido);
  emit("abrir-modal", jugador);
};
</script>