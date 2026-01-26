<template>
  <div
    class="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 group"
  >
    <div
      class="h-36 bg-slate-200 relative bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
      data-alt="Arquitectura estadio moderno"
      style="
        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB30OZA1H6523HUw2JGWkvHHIQy8IWcG5Y4iEzaf77EhItX4HpYapaUBBZLMo_MRa0V2a4rbionTeysEJqROY3F2JkX99xaKOC3r1ONMb45D80xR31inxoUWAmXGJOOZZbOf7tYpJyu5-7hTv5-gens0E1PtuhuhXHaip19Fb6owXz-mOECBw7lhs_DkQKEUQekaDoy0C3ypCyZMKnUzO9JDeK_h2nJNctAKj8qp4A8KYPo1L7gmDJwRlFBhvy90Ptgrb_12w7-Ig8');
      "
    >
      <div
        class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"
      ></div>
      <div class="absolute bottom-3 left-4">
        <p
          class="text-white text-xs font-bold uppercase tracking-widest opacity-80"
        >
          Fecha: 30 de Octubre
        </p>
        <p class="text-white text-base font-bold">
          Estadio: King Power Stadium
        </p>
      </div>
      <div class="absolute top-3 right-3">
        <span
          class="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded"
          >Hora: 20:00</span
        >
      </div>
    </div>
    <div class="p-5 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="size-8 rounded-full bg-slate-100 p-1">
            <div
              class="w-full h-full bg-contain bg-no-repeat bg-center"
              data-alt="Escudo local"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXY1a52GFLag1pZ-Q4YAhTGR0RiBFbajDezrCazUoppWn2UZsn8oRh92LhfUlTMl3IkYPXyuUu0EgI1uggmOTjx9RyvK_mHwREcrd122LC4tlXGvgSd1ACDwH1fzFb0WlMwxBe1fXbBmJXGdcObDYDHDwtuHf9hg9zYSZ6EKVxCVkml2SejrtEwQrv2MqOPtDD8v9bmGyfJX7schH4eljFBF8oeiT4kAoGThZYaP5rdIXpGhn7sUzI5YNXfOharLxU8ZMcfaQiLDI');
              "
            ></div>
          </div>
          <span class="text-xs font-bold">LEI</span>
          <span class="text-slate-500 font-bold text-xs">vs</span>
          <span class="text-xs font-bold">AVL</span>
          <div class="size-8 rounded-full bg-slate-100 p-1">
            <div
              class="w-full h-full bg-contain bg-no-repeat bg-center"
              data-alt="Escudo visitante"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj4bHFIL7MjGTHFquNYzpsQn4IENuJ-5hNSyzvz77KuMrFya5D6GkNC7ipvEklqiU4KQUhObtAA0X0mtvEt46eFPSVG6FWMUW1Y5nsJt973GpVpP1t3laiAicBaY9W75AIQc6hKBZAK2hNrYK9PPXhQ7w3qrYQy24jbkxPa5gPY6yWNvj3JjUxmtC40GXygLBg14q54ZAgAjcI0rRBBZSMLibBrOWv44BlwyNYbRIId-X2eCM09OBKawWxAmqTNIXHaUFOP3vymfg');
              "
            ></div>
          </div>
        </div>
        <span
          class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter"
          >Copa de la Liga</span
        >
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-xs font-medium text-slate-500">Equipo Arbitral</p>
        <div class="flex -space-x-2">
          <div
            class="size-6 rounded-full border-2 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold"
          >
            CW
          </div>
          <div
            class="size-6 rounded-full border-2 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold"
          >
            AR
          </div>
          <div
            class="size-6 rounded-full border-2 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold"
          >
            MP
          </div>
        </div>
      </div>
      <button
        class="w-full py-2 bg-slate-100 hover:bg-[#359EFF] hover:text-white transition-colors text-slate-400 rounded-lg text-xs font-bold uppercase tracking-wider"
      >
        Ver Detalles del Partido
      </button>
    </div>
  </div>
</template>
