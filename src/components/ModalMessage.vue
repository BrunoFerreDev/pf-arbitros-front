<template>
    <div
        class="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ease-in">
        <div class="p-8 flex flex-col items-center text-center">
            <!-- Icon Header -->
            <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <span class="material-symbols-outlined !text-4xl">error</span>
            </div>
            <!-- Title -->
            <h2 class="text-2xl font-bold text-[#111218] mb-2">{{ titulo }}</h2>
            <!-- Message -->
            <p class="text-gray-600 text-base leading-relaxed mb-8 text-wrap">
                {{ mensaje }}
            </p>
            <!-- Actions -->
            <div class="flex flex-col-reverse sm:flex-row w-full gap-3">
                <button @click="closeModal"
                    class="flex-1 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#111218] font-bold text-base transition-colors duration-200">
                    Ok
                </button>
            </div>
        </div>
        <!-- Footer Decoration (Optional subtle football-themed pattern) -->
        <div class="h-1 bg-gradient-to-r from-[#1f44f9]/10 via-[#1f44f9] to-[#1f44f9]/10"></div>
    </div>
</template>
<script setup>
defineProps({
    titulo: String,
    mensaje: String
})
const emit = defineEmits(['closeModal']);
const closeModal = () => {
    emit('closeModal');
}
</script>