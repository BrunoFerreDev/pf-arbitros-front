<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f7f8]/80">
    <Aside />
    <main class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div class="px-8 py-6 space-y-8">
        <div
          class="border-b border-slate-200 flex flex-col md:flex-row items-start gap-8"
        >
          <a
            class="w-full md:w-auto border-b-2 border-[#359EFF] pb-4 px-1 text-[#359EFF] text-sm font-bold flex items-center gap-2"
            href="#"
          >
            Próximos
            <span
              class="bg-[#359EFF]/20 text-[#359EFF] text-[10px] px-1.5 py-0.5 rounded-full"
              >4</span
            >
          </a>
          <a
            class="w-full md:w-auto border-b-2 border-transparent pb-4 px-1 text-slate-500 text-sm font-bold transition-colors"
            href="#"
            >Completados</a
          >
          <a
            class="w-full md:w-auto border-b-2 border-transparent pb-4 px-1 text-slate-500 text-sm font-bold transition-colors"
            href="#"
            >Pendientes de Revisión</a
          >
        </div>
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <span class="size-2 rounded-full bg-red-500 animate-pulse"></span>
              Acción Requerida
            </h3>
          </div>
          <div class="next-match-list">
            <MatchCard v-for="n in 10" :key="n" />
          </div>
        </section>
        <section>
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold">Próximas Designaciones</h3>
            <div class="flex gap-2">
              <button class="p-2 rounded bg-slate-100 text-slate-400">
                <span class="material-symbols-outlined text-sm">grid_view</span>
              </button>
              <button class="p-2 rounded bg-slate-100 text-slate-400">
                <span class="material-symbols-outlined text-sm">list</span>
              </button>
            </div>
          </div>
          <div class="next-match-list">
            <NextMatchCard v-for="n in 6" :key="n" />
          </div>
        </section>
        <StatsRefeere />
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
</script>
<style scoped>
.next-match-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0 auto;
}
</style>
