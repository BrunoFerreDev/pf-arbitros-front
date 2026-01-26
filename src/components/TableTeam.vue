<template>
  <div class="overflow-x-auto mt-5 border border-slate-200 rounded-lg">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-slate-200 bg-slate-100">
          <th
            class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 w-16 text-center"
          >
            #
          </th>
          <th
            class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Jugador
          </th>
          <th
            class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            DNI / F.Identificación
          </th>
          <th
            class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 text-right"
          >
            Acciones
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100">
        <tr class="bg-blue-50/40">
          <td
            colspan="4"
            class="px-6 py-2 text-[10px] font-bold text-blue-700 uppercase tracking-widest"
          >
            Once Inicial (Titulares)
          </td>
        </tr>

        <tr
          v-for="(jugador, index) in jugadores"
          :key="jugador.idJugador"
          class="hover:bg-slate-50 transition-colors group"
        >
          <td class="py-4 px-6 text-blue-700 font-black text-center text-lg">
            {{ index + 1 }}
          </td>
          <td class="py-4 px-6">
            <div class="flex items-center gap-3">
              <div
                class="size-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border-2 border-blue-200 shadow-sm"
                :style="{
                  backgroundImage: `url(${jugador.foto || 'https://via.placeholder.com/150'})`,
                }"
              ></div>
              <div>
                <p
                  class="font-bold text-slate-900 text-sm uppercase leading-tight"
                >
                  {{ jugador.apellido }}
                </p>
                <p class="text-xs text-slate-500">{{ jugador.nombre }}</p>
              </div>
            </div>
          </td>
          <td class="py-4 px-6">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border border-slate-200 bg-white"
            >
              {{ formatDNI(jugador.dni) }}
            </span>
          </td>
          <td class="py-4 px-6 text-right">
            <button
              @click="manejarClickIncidencia(jugador)"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-blue-400 transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-sm">edit_note</span>
              Incidencia
            </button>
          </td>
        </tr>

        <template v-if="jugadores.suplentes && jugadores">
          <tr class="bg-slate-50">
            <td
              colspan="4"
              class="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-200"
            >
              Banca de Suplentes
            </td>
          </tr>
          <tr
            v-for="(jugador, index) in jugadores.suplentes"
            :key="jugador.idJugador"
            class="hover:bg-slate-50 transition-colors opacity-90 group"
          >
            <td class="py-3 px-6 text-slate-400 font-bold text-center text-md">
              {{ 12 + index }}
            </td>
            <td class="py-3 px-6">
              <div class="flex items-center gap-3">
                <div
                  class="size-9 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border border-slate-200 grayscale-[0.3]"
                  :style="{
                    backgroundImage: `url(${jugador.foto || 'https://via.placeholder.com/150'})`,
                  }"
                ></div>
                <div>
                  <p class="font-medium text-slate-700 text-sm uppercase">
                    {{ jugador.apellido }}
                  </p>
                  <p class="text-[10px] text-slate-400">{{ jugador.nombre }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-slate-500 text-sm">
              {{ formatDNI(jugador.dni) }}
            </td>
            <td class="py-3 px-6 text-right">
              <button
                @click.prevent="manejarClickIncidencia(jugador)"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all"
              >
                <span class="material-symbols-outlined text-sm">edit_note</span>
                Incidencia
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  // Cambiamos el tipo de Array a Object porque ahora recibes { titulares: [], suplentes: [] }
  jugadores: {
    type: Object,
    required: true,
    default: () => ({ titulares: [], suplentes: [] }),
  },
});

const formatDNI = (dni) => {
  return new Intl.NumberFormat("es-AR").format(dni);
};
// 1. Definimos los eventos que este componente puede enviar hacia arriba
const emit = defineEmits(["abrir-modal"]);

// 2. Función local que se ejecuta al hacer click en el botón
const manejarClickIncidencia = (jugador) => {
  // Emitimos el evento hacia el padre pasando el objeto jugador completo
  emit("abrir-modal", jugador);
};
</script>
