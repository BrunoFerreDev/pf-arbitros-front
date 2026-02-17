<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f7f8]/80">
    <Aside :arbitro="arbitro" />
    <main class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div class="px-8 py-6 space-y-8">
        <div class="border-b border-slate-200 flex flex-col md:flex-row items-start gap-8">
          <button @click="() => {
            estadoPartido = 'FINALIZADO'
            pagination.page = 0;
            traerPartidos();
          }"
            :class="estadoPartido === 'FINALIZADO' ? 'border-[#359EFF] text-[#359EFF]' : 'border-transparent text-slate-500'"
            class="w-full md:w-auto border-b-2 pb-4 px-1 text-sm font-bold flex items-center gap-2">Finalizados
          </button>
          <button @click="() => {
            estadoPartido = 'PROGRAMADO';
            pagination.page = 0;
            traerPartidos();
          }"
            :class="estadoPartido === 'PROGRAMADO' ? 'border-[#359EFF] text-[#359EFF]' : 'border-transparent text-slate-500'"
            class="w-full md:w-auto border-b-2 pb-4 px-1 text-sm font-bold flex items-center gap-2">
            Próximos
          </button>
          <button @click="() => {
            estadoPartido = 'PENDIENTE'
            pagination.page = 0;
            traerPartidos();
          }"
            :class="estadoPartido === 'PENDIENTE' ? 'border-[#359EFF] text-[#359EFF]' : 'border-transparent text-slate-500'"
            class="w-full md:w-auto border-b-2 pb-4 px-1 text-sm font-bold flex items-center gap-2">Pendientes
            de Revisión
          </button>
        </div>
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <span class="size-2 rounded-full bg-red-500 animate-pulse"></span>
              {{ estadoPartido === 'PROGRAMADO' ?
                'Próximos' : estadoPartido === 'FINALIZADO' ? 'Finalizados' : 'Pendientes'
                  + 'de Revisión' }}
            </h3>
          </div>
          <div class="next-match-list">
            <MatchCard v-if="partidos.length > 0" v-for="partido in partidos" :key="partido.idPartido"
              :partido="partido" />
            <p v-else>No hay partidos {{ estadoPartido === 'PROGRAMADO' ? 'próximos' : estadoPartido === 'FINALIZADO' ?
              'finalizados' : 'pendientes de revisión' }}</p>
          </div>
          <Pagination v-if="partidos.length > 0" :page="pagination.page" :totalPages="pagination.totalPages"
            :totalElements="pagination.totalElements" :size="pagination.size" @page-change="handlePageChange" />
        </section>

        <StatsRefeere :stats="{
          partidosEstaTemporada: pagination.totalElements,
          tarjetasAmarillas: 82,
          tarjetasRojas: 3,
          distanciaMedia: 10.4,
          calificacionMedia: 4.8,
        }" />
      </div>
      <Footer />
    </main>
  </div>
</template>
<script setup>
import Aside from "../components/Aside.vue";
import MatchCard from "../components/MatchCard.vue";
import Header from "../components/Header.vue";
import Pagination from "../components/Pagination.vue";
import StatsRefeere from "../components/StatsRefeere.vue";
import Footer from "../components/Footer.vue";
import { computed, onMounted, ref, watch } from "vue";
import axios from "axios";
const arbitro = ref({});
const partidos = ref([]);
const estadoPartido = ref("FINALIZADO")
const pagination = ref({
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
});
const traerArbitro = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/personas/autenticado", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = response.data;
    arbitro.value = data;
    traerPartidos();
  } catch (error) {
    console.error("Error al obtener el arbitro:", error);
  }
}
const traerPartidos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/arbitros/buscar-designaciones", {
      params: {
        idArbitro: arbitro.value.idPersona,
        estado: estadoPartido.value,
        page: pagination.value.page,
        size: pagination.value.size,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = response.data;
    partidos.value = data.content;
    pagination.value.totalPages = data.totalPages;
    pagination.value.totalElements = data.totalElements;
    console.log(data);

  } catch (error) {
    console.error("Error al obtener el arbitro:", error);
  }
}
onMounted(() => {
  traerArbitro();
});
watch([() => pagination.value.page, () => pagination.value.size], () => {
  traerPartidos();
});

// --- EVENTOS ---
const handlePageChange = (newPage) => {
  // Solo actualizamos el valor, el watcher detectará el cambio y llamará a fetchArbitros
  pagination.value.page = newPage;
};
</script>
<style scoped>
.next-match-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0 auto;
}
</style>
