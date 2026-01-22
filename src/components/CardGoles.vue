<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label
            class="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider"
            >Seleccionar Equipo</label
          >
          <div class="flex h-11 p-1 bg-slate-100 rounded-lg">
            <label
              class="flex-1 flex items-center justify-center rounded-md cursor-pointer transition-all bg-white shadow-sm text-[#607AFB] font-bold"
            >
              <input checked="" class="hidden" name="team" type="radio" />
              Local
            </label>
            <label
              class="flex-1 flex items-center justify-center rounded-md cursor-pointer transition-all text-slate-500 hover:text-slate-700"
            >
              <input class="hidden" name="team" type="radio" />
              Visitante
            </label>
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider"
            >Jugador</label
          >
          <select
            class="w-full h-11 bg-slate-50 border-slate-200 rounded-lg focus:ring-[#607AFB] focus:border-[#607AFB]"
          >
            <option>Buscar en la plantilla...</option>
            <option>9 - Erling Haaland</option>
            <option>17 - Kevin De Bruyne</option>
            <option>47 - Phil Foden</option>
            <option>10 - Jack Grealish</option>
          </select>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label
            class="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider"
            >Minuto</label
          >
          <div class="relative">
            <input
              class="w-full h-11 bg-slate-50 border-slate-200 rounded-lg pl-4 pr-12 focus:ring-[#607AFB] focus:border-[#607AFB]"
              type="number"
              value="74"
            />
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold"
            >
              '
            </div>
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider"
            >Tipo de Gol</label
          >
          <select
            class="w-full h-11 bg-slate-50 border-slate-200 rounded-lg focus:ring-[#607AFB] focus:border-[#607AFB]"
          >
            <option>Gol de Jugada</option>
            <option>Penalti</option>
            <option>Autogol</option>
            <option>Cabeza</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-8 pt-6 border-t border-slate-200 flex justify-end">
      <button
        class="flex items-center gap-2 bg-[#607AFB] hover:bg-[#607AFB]/90 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#607AFB]/25"
      >
        <span class="material-symbols-outlined">add_circle</span>
        Registrar Gol
      </button>
    </div>
  </div>
</template>
