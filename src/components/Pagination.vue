<template>
    <!-- Pagination -->
    <div class="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">

        <span class="text-sm text-slate-500 hidden md:block">
            Mostrando
            <span class="font-bold text-slate-900">{{ rangeStart }}-{{ rangeEnd }}</span>
            de
            <span class="font-bold text-slate-900">{{ totalElements }}</span>
        </span>

        <div class="flex gap-2">
            <button @click="$emit('page-change', page - 1)" :disabled="page === 0"
                class="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
            </button>

            <template v-for="(p, index) in visiblePages" :key="index">

                <button v-if="p !== '...'" @click="$emit('page-change', p)"
                    class="flex items-center justify-center px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors"
                    :class="[
                        p === page
                            ? 'text-white bg-[#0d7ff2] border-[#0d7ff2] hover:bg-blue-600'
                            : 'text-slate-600 bg-white border-slate-300 hover:bg-slate-50'
                    ]">
                    {{ p + 1 }}
                </button>

                <span v-else class="flex items-center justify-center px-2 py-1.5 text-sm text-slate-400">
                    ...
                </span>

            </template>

            <button @click="$emit('page-change', page + 1)" :disabled="page >= totalPages - 1"
                class="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Siguiente
            </button>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

// Definimos el evento para avisar al padre
const emit = defineEmits(['page-change']);
const props = defineProps({
    // Nuevas props para paginación
    page: { type: Number, default: 0 },         // Página actual (0-indexed)
    totalPages: { type: Number, default: 0 },   // Total de páginas
    totalElements: { type: Number, default: 0 },// Total de items
    size: { type: Number, default: 10 },
})
// Cálculos visuales para "Mostrando 1-10 de 50"
const rangeStart = computed(() => {
    if (props.totalElements === 0) return 0;
    return (props.page * props.size) + 1;
});

const rangeEnd = computed(() => {
    const end = (props.page + 1) * props.size;
    return end > props.totalElements ? props.totalElements : end;
});

// Lógica inteligente para mostrar botones limitados
const visiblePages = computed(() => {
    const total = props.totalPages;
    const current = props.page;
    const delta = 1; // Cuántos botones mostrar a los lados del actual
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 0; i < total; i++) {
        // Siempre mostramos:
        // 1. La primera página (0)
        // 2. La última página (total - 1)
        // 3. El rango alrededor de la página actual (current - delta a current + delta)
        if (i === 0 || i === total - 1 || (i >= current - delta && i <= current + delta)) {
            range.push(i);
        }
    }

    // Insertar los puntos suspensivos (...) donde haya huecos
    range.forEach(i => {
        if (l) {
            if (i - l === 2) {
                // Si el hueco es de 1 solo número (ej: 1 y 3), metemos el 2 en vez de puntos
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                // Si el hueco es grande, metemos el marcador de puntos
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    });

    return rangeWithDots;
});
</script>