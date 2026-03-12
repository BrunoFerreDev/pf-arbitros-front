<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from './BaseInput.vue';
import ModalMessage from '@/components/ModalMessage.vue';
import { useAuth } from '../hooks/useAuth';

const router = useRouter();
const showModal = ref(false)
const tituloError = ref('')
const mensajeError = ref('')
const showButton = ref(true)
const errorIcon = ref('')

// Estado del formulario
const form = ref({
    email: '',
    password: '',
});

const { login: authLogin } = useAuth();

const login = async () => {
    try {
        const data = await authLogin(form.value.email, form.value.password);
        mensajeError.value = 'Inicio de sesión exitoso';
        tituloError.value = 'Éxito';
        showModal.value = true;
        showButton.value = false;
        errorIcon.value = 'check_circle';
        setTimeout(() => {
            showModal.value = false;
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        console.error(error);
        mensajeError.value = 'Credenciales incorrectas, por favor intente nuevamente';
        tituloError.value = 'Error';
        showModal.value = true;
        errorIcon.value = 'error';
        showButton.value = true;
    }
}

const handleSubmit = () => {
    if (!form.value.email || !form.value.password) {
        mensajeError.value = 'Por favor, complete todos los campos';
        tituloError.value = 'Error';
        showModal.value = true;
        errorIcon.value = 'error';
    } else {
        login()
    }
}
</script>

<template>
    <div class="relative z-20 w-full max-w-[450px]">
        <div class="bg-white shadow-2xl rounded-xl overflow-hidden border-t-4 border-[#13ec13]">
            <div class="p-8 md:p-10">

                <div class="flex flex-col items-center mb-8">
                    <div class="w-16 h-16 bg-[#13ec13]/10 rounded-full flex items-center justify-center mb-4">
                        <span class="material-symbols-outlined text-[#13ec13] text-4xl">sports_soccer</span>
                    </div>
                    <h1 class="text-2xl font-bold text-zinc-900 text-center">Panel de Árbitros</h1>
                    <p class="text-zinc-500 text-sm mt-1">Ingresa para gestionar tus partidos</p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-5">

                    <BaseInput label="Correo Electrónico" placeholder="correo@ejemplo.com" icon="mail"
                        v-model="form.email" />

                    <BaseInput label="Contraseña" type="password" placeholder="••••••••" icon="lock"
                        v-model="form.password" />

                    <!-- <BaseInput label="Código de Árbitro" type="text" placeholder="REF-0000" icon="badge"
                        v-model="form.refereeCode" /> -->

                    <button
                        class="w-full bg-[#13ec13] hover:bg-[#13ec13]/90 text-black font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-[#13ec13]/20 flex items-center justify-center gap-2 mt-2"
                        type="submit">
                        <span>INGRESAR</span>
                        <span class="material-symbols-outlined">login</span>
                    </button>
                </form>

                <div class="mt-8 pt-6 border-t border-zinc-100 flex flex-col items-center gap-3">
                    <a class="text-sm font-medium text-zinc-600 hover:text-[#13ec13] transition-colors" href="#">
                        ¿Olvidaste tu contraseña?
                    </a>
                    <div class="flex items-center gap-2 text-sm text-zinc-400">
                        <span>¿Problemas para acceder?</span>
                        <a class="text-[#13ec13] font-semibold hover:underline" href="#">
                            Soporte Técnico
                        </a>
                    </div>
                </div>
            </div>

            <div class="bg-zinc-50 py-3 px-8 text-center">
                <p class="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Federación Oficial de Arbitraje
                </p>
            </div>
        </div>

        <p class="text-white/60 text-xs text-center mt-6 px-4">
            Este es un sistema privado. El acceso no autorizado está estrictamente prohibido y sujeto a sanciones
            legales.
        </p>
    </div>
    <div class="z-50 fixed inset-0 bg-black/50 flex items-center justify-center p-4 " v-if="showModal">
        <ModalMessage :showModal="showModal" @closeModal="showModal = false" :titulo="tituloError"
            :showButton="showButton" :mensaje="mensajeError" :errorIcon="errorIcon" />
    </div>
</template>