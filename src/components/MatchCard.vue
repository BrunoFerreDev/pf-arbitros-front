<template>
  <div class="bg-white border border-slate-200 p-5 flex flex-col gap-5 shadow-sm">
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <span class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">{{
          partido.competenciaDTO.nombre }}</span>
      </div>
      <span class="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
    </div>
    <div class="flex items-center justify-between px-4 h-full max-h-44">
      <div class="flex flex-col items-center gap-3 flex-1 text-center">
        <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">Local</p>
        <div class="size-16 bg-slate-100 rounded-full flex items-center justify-center p-2">
          <div class="w-full h-full bg-contain bg-no-repeat bg-center" data-alt="Escudo Arsenal" style="
              background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuD5IUcqK-AnYjdFfQnhR8MzKeAoMoGAD9n7emw1CyzS1Lf28QmouztTu1oHwXf6grmIAfHmBT5p3nyKijYjXpiTdWwCdcWdEk-p3B_fy42l4FK4JnC5pipXkku-1fKSEi3-A8KwB_ivNMCGyZ_rahxwrHX2YkYM4qElaP6jUCqMDAcBXcYYoFhR9h-LCrVKaN3uyrpJH78R1poB3ZQjOA4VNJ7HEFMsO148EaBq-VQeCWkXDtB8BNVlFZSAvdmBMoCgBT6N0HyfH4E&quot;);
            "></div>
        </div>
        <p class="font-bold text-sm">{{ props.partido.clubLocal.nombre }}</p>
      </div>
      <div class="flex flex-col items-center gap-1">
        <p class="text-3xl font-black">0 - 0</p>
      </div>
      <div class="flex flex-col items-center gap-3 flex-1 text-center">
        <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">
          Visitante
        </p>
        <div class="size-16 bg-slate-100 rounded-full flex items-center justify-center p-2">
          <div class="w-full h-full bg-contain bg-no-repeat bg-center" data-alt="Escudo Liverpool" style="
              background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuB5fwFTyRr8sqImTh2li6nI3EVChbuaErkegone3uSNgIteyTq-asrqiJ3zdaf4MBiyMjnRG5JrCKRCSYXXy19pgZvGirVwTsUIRks-Y8kL_SXDp8hNqu8-JpLzjLyebilgXbnwQ6UBimw5D_ZJvu9yMAGt_sWEqWYAZz4mEy50HZe2qEynwOZbKoocCHMwaOEOXJgd15Js98FUEkVRBUzJ2ahHnp7YSuZjRxYits-Ayj3SnqhJNj8izLen-1qr60W20bSCqlhxmPs&quot;);
            "></div>
        </div>
        <p class="font-bold text-sm">{{ props.partido.clubVisitante.nombre }}</p>
      </div>
    </div>
    <div class="pt-4 border-t border-slate-100 flex gap-3">
      <button @click.prevent="navigateTo('/partido/' + partido.idPartido)" type="submit"
        v-if="partido.estado == 'PENDIENTE'"
        class="cursor-pointer flex-1 py-2.5 bg-[#359EFF] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[18px]">edit_note</span>
        Completar Informe
      </button>
      <button type="submit" v-if="partido.estado == 'FINALIZADO'"
        class="cursor-pointer flex-1 py-2.5 bg-[#359EFF] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
        <span class="material-symbols-outlined">
          list_alt_check
        </span>
        Ver Partido
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  partido: {
    type: Object,
    required: true,
  },
});

const navigateTo = (route) => {
  router.push(route);
};
</script>
