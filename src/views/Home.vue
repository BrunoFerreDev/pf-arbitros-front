<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f7f8]/80">
    <Aside :arbitro="arbitro" />
    <main class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div class="px-8 py-6 space-y-8 flex flex-col h-full justify-start">
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
            estadoPartido = 'ABIERTO'
            pagination.page = 0;
            traerPartidos();
          }"
            :class="estadoPartido === 'ABIERTO' ? 'border-[#359EFF] text-[#359EFF]' : 'border-transparent text-slate-500'"
            class="w-full md:w-auto border-b-2 pb-4 px-1 text-sm font-bold flex items-center gap-2">Pendientes
            de Revisión
          </button>
        </div>
        <section class="bg-white rounded-lg shadow p-6">
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
        </section>
        <Pagination v-if="partidos.length > 0" :page="pagination.page" :totalPages="pagination.totalPages"
          :totalElements="pagination.totalElements" :size="pagination.size" @page-change="handlePageChange"
          class="mt-auto" />

        <!-- <StatsRefeere :stats="{
          partidosEstaTemporada: pagination.totalElements,
          tarjetasAmarillas: 82,
          tarjetasRojas: 3,
          distanciaMedia: 10.4,
          calificacionMedia: 4.8,
        }" /> -->
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
import { useAuth } from "../hooks/useAuth";
import { useArbitros } from "../hooks/useArbitros";

const arbitro = ref({});
const partidos = ref([]);
const estadoPartido = ref("FINALIZADO")
const pagination = ref({
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
});

const { fetchAuthenticatedUser } = useAuth();
const { buscarDesignaciones } = useArbitros();

const traerArbitro = async () => {
  try {
    const data = await fetchAuthenticatedUser();
    arbitro.value = data;
    traerPartidos();
  } catch (error) {
    console.error("Error al obtener el arbitro:", error);
  }
}

const traerPartidos = async () => {
  if (!arbitro.value.idPersona) return; // Wait until referee is loaded
  try {
    const data = await buscarDesignaciones(
      arbitro.value.idPersona,
      estadoPartido.value,
      pagination.value.page,
      pagination.value.size
    );
    partidos.value = data.content;
    pagination.value.totalPages = data.totalPages;
    pagination.value.totalElements = data.totalElements;
  } catch (error) {
    console.error("Error al obtener partidos:", error);
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
  // Solo actualizamos el valor, el watcher detectará el cambio y llamará a traerPartidos
  pagination.value.page = newPage;
};
</script>
<style scoped>
.next-match-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  justify-content: space-around;
  gap: 1.5rem;
}
</style>
