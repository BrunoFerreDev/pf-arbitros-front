<template>
  <div class="bg-white border border-slate-200 p-5 flex flex-col gap-5 shadow-sm shrink-0">
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <span
          :class="partido.estado === 'ABIERTO' ? 'bg-red-500/10 text-red-500' : partido.estado === 'FINALIZADO' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'"
          class="px-2 py-1  text-[10px] font-bold uppercase tracking-wider rounded border">{{
            partido.estado }}</span>
        <span class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">{{
          competencia.categoria }}</span>
      </div>
      <span class="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
    </div>
    <div class="flex items-center justify-between px-2 grow">
      <div class="flex flex-col items-center gap-3 flex-1 text-center min-w-0">
        <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">Local</p>
        <div class="size-16 bg-slate-100 rounded-full flex items-center justify-center p-2 shrink-0">
          <div class="w-full h-full bg-contain bg-no-repeat bg-center" data-alt="Escudo Arsenal" :style="{
            backgroundImage: `url(${partido.clubLocal.escudo})`
          }"></div>
        </div>
        <p class="font-bold text-sm truncate w-full" :title="partido.clubLocal.nombre">{{ partido.clubLocal.nombre }}
        </p>
      </div>
      <div class="flex flex-col items-center gap-1 px-2">
        <p class="text-xl font-black">vs</p>
      </div>
      <div class="flex flex-col items-center gap-3 flex-1 text-center min-w-0">
        <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">
          Visitante
        </p>
        <div class="size-16 bg-slate-100 rounded-full flex items-center justify-center p-2 shrink-0">
          <div class="w-full h-full bg-contain bg-no-repeat bg-center" data-alt="Escudo Liverpool" :style="{
            backgroundImage: `url(${partido.clubVisitante.escudo})`
          }"></div>
        </div>
        <p class="font-bold text-sm truncate w-full" :title="partido.clubVisitante.nombre">{{
          partido.clubVisitante.nombre }}</p>
      </div>
    </div>
    <div class="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 mt-auto">
      <button @click.prevent="navigateTo('/dashboard/partido/' + partido.idPartido)" v-if="partido.estado === 'ABIERTO'"
        class="col-span-2 py-2.5 bg-[#359EFF] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[18px]">edit_note</span>
        Cargar Informe
      </button>
      <button v-if="partido.estado === 'FINALIZADO'"
        @click.prevent="navigateTo('/dashboard/partido/' + partido.idPartido)"
        class="col-span-2 py-2.5 bg-[#359EFF] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[18px]">edit_note</span>
        Ver Informe
      </button>
      <button v-if="partido.estado === 'PROGRAMADO'" @click.prevent="descargar(partido.idPartido)"
        class="col-span-2 py-2.5 bg-[#359EFF] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
        <span class="material-symbols-outlined text-[18px]">download</span>
        Descargar designacion
      </button>
      <span v-if="isLoading" class="col-span-2 text-center text-sm text-slate-500">Descargando...</span>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);
const navigateTo = (route) => {
  router.push(route);
};
const props = defineProps({
  partido: {
    type: Object,
    required: true,
  },
});
const competencia = ref(props.partido.competenciaDTO)
const descargar = async (idPartido) => {
  isLoading.value = true;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/api/arbitros/designacion/pdf?idPartido=' + idPartido,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    responseType: 'blob'
  };

  axios.request(config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Designacion_Partido_${idPartido}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    })

}
</script>
