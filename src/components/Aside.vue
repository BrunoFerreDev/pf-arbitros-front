<template>
  <aside
    class="w-72 bg-[#f5f7f8]/80 border-r border-l border-slate-200 flex-col h-full hidden md:flex"
  >
    <div class="p-6 flex flex-col h-full justify-between">
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div
              class="size-12 rounded-full bg-cover border-2 border-[#359EFF]"
              data-alt="Retrato profesional de un árbitro"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfCo9WsxgTjGZmlN7enfwrwridauksXjemm_DEdhe5gcR5kU-vVigqQSnnpl3sngcTRJ9u3O0HD2Nk6zXlIY_MbiJuwhIjxfAhOXN7QVIzaODI60vUP1LbpTIlzsw51qZ0KzJV33Ww4Iz8YiNc02LMa7_UnG0iEFTQ8dx5az_-7Uo4R2vI8kHSudVOLo6HezvOVuMCVt9kfxVDRYC26eUhg3ielKaANg-RcZCJ-U0pI3erSIdASpSV6J64sQZbI8US9SKrn4VP_6M');
              "
            ></div>
            <div
              class="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#111722] rounded-full"
            ></div>
          </div>
          <div class="flex flex-col">
            <h1 class="text-base font-bold leading-tight">Mark Phillips</h1>
            <p class="text-xs font-normal">Árbitro Élite FIFA</p>
          </div>
        </div>
        <nav class="flex flex-col gap-2">
          <div
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#359EFF]/10 text-[#359EFF]"
          >
            <RouterLink to="/" class="inline-flex items-center gap-3">
              <span class="material-symbols-outlined fill-icon">dashboard</span>
              <p class="text-sm font-semibold leading-normal">
                Panel Principal
              </p>
            </RouterLink>
          </div>
          <div
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">calendar_today</span>
            <RouterLink to="/agenda">
              <p class="text-sm font-medium leading-normal">Mi Agenda</p>
            </RouterLink>
          </div>
          <div
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">history</span>
            <p class="text-sm font-medium leading-normal">
              Historial de Incidencias
            </p>
          </div>
          <div
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">sports</span>
            <p class="text-sm font-medium leading-normal">Herramientas</p>
          </div>
          <div
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">settings</span>
            <p class="text-sm font-medium leading-normal">Configuración</p>
          </div>
        </nav>
      </div>
      <div class="flex flex-col gap-3">
        <div class="p-4 rounded-xl bg-slate-100">
          <p
            class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
          >
            Próxima Reunión
          </p>
          <p class="text-sm font-medium">22 de Octubre, 09:00 AM</p>
          <p class="text-xs">Charla técnica pre-partido</p>
        </div>
        <button
          class="w-full py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  </aside>
</template>
