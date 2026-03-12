<script setup>
const props = defineProps({
    label: String,
    modelValue: String,
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String,
    icon: String // El nombre del icono de Material Symbols
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div>
        <label class="block text-sm font-semibold text-zinc-700  mb-2">
            {{ label }}
        </label>
        <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">
                {{ icon }}
            </span>
            <input :type="type" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="w-full pl-11 pr-4 py-3 rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
        </div>
    </div>
</template>