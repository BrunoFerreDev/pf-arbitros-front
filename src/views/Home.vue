<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f7f8]/80">
    <Aside />
    <main class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div class="px-8 py-6 space-y-8">
        <div class="border-b border-slate-200 flex flex-col md:flex-row items-start gap-8">
          <button @click.prevent="activeTab = 'proximos'"
            :class="activeTab == 'proximos' ? 'border-[#359EFF] text-[#359EFF] border-b-2' : 'border-transparent text-slate-500 hover:text-slate-700'"
            class="w-full md:w-auto border-b-2  pb-4 px-1  text-sm font-bold flex items-center gap-2">
            Próximos
            <span class="bg-[#359EFF]/20 text-[#359EFF] text-[10px] px-1.5 py-0.5 rounded-full"
              v-if="activeTab == 'proximos'">{{ activeTab ==
                'proximos' ? filteredPartidos.length : '' }}</span>
          </button>
          <button @click.prevent="activeTab = 'completados'"
            :class="activeTab == 'completados' ? 'border-[#359EFF] text-[#359EFF] border-b-2' : 'border-transparent text-slate-500 hover:text-slate-700'"
            class="w-full md:w-auto  pb-4 px-1  text-sm font-bold transition-colors">Completados
            <span class="bg-[#359EFF]/20 text-[#359EFF] text-[10px] px-1.5 py-0.5 rounded-full"
              v-if="activeTab == 'completados'">{{ activeTab == 'completados' ? filteredPartidos.length : '' }}</span>
          </button>



          <button type="submit" @click.prevent="activeTab == 'pendientes'"
            class="w-full md:w-auto border-b-2 border-transparent pb-4 px-1 text-slate-500 text-sm font-bold transition-colors"
            href="#">Pendientes de Revisión</button>
        </div>
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <span class="size-2 rounded-full animate-pulse"
                :class="activeTab == 'proximos' ? 'bg-yellow-400' : 'bg-green-400'"></span>
              {{ activeTab == 'proximos' ? 'Próximos Partidos' : 'Partidos Completados' }}
            </h3>
          </div>
          <div class="next-match-list" v-if="filteredPartidos.length > 0">
            <MatchCard v-for="p in filteredPartidos" :key="p.id" :partido="p" />
          </div>
        </section>

        <StatsRefeere :stats="{ cantidadPartidos: partidos.length }" />
      </div>
      <Footer />
    </main>
  </div>
</template>
<script setup>
import Aside from "../components/Aside.vue";
import MatchCard from "../components/MatchCard.vue";
import Header from "../components/Header.vue";
import NextMatchCard from "../components/NextMatchCard.vue";
import StatsRefeere from "../components/StatsRefeere.vue";
import Footer from "../components/Footer.vue";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
const partidos = ref([])

const fetchPartidos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/arbitros/buscar-designaciones?idArbitro=1")
    const data = response.data;
    const orderData = data.sort((a, b) => b.idPartido - a.idPartido)
    partidos.value = orderData
    const nextMatchs = partidos.value.filter(partido => partido.estado === 'PENDIENTE')
    console.log(nextMatchs)
    const finalMatchs = partidos.value.filter(partido => partido.estado === 'FINALIZADO')
    console.log(finalMatchs)
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  fetchPartidos()
})
const activeTab = ref("proximos")
const filteredPartidos = computed(() => {
  if (activeTab.value === "completados") {
    return partidos.value.filter(partido => partido.estado === 'FINALIZADO')
  } else if (activeTab.value === "proximos") {
    return partidos.value.filter(partido => partido.estado === 'PENDIENTE')
  } else if (activeTab.value === "pendientes") {
    return partidos.value.filter(partido => partido.estado === 'ABIERTO')
  } else {
    return partidos.value
  }
})
</script>
<style scoped>
.next-match-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0 auto;
}
</style>
