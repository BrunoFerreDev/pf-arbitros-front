<template>
    <div
        class="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ease-in">
        <div class="p-8 flex flex-col items-center text-center">
            <!-- Icon Header -->
            <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <span class="material-symbols-outlined !text-4xl">logout</span>
            </div>
            <!-- Title -->
            <h2 class="text-2xl font-bold text-[#111218] mb-2">¿Cerrar Sesión?</h2>
            <!-- Message -->
            <p class="text-gray-600 text-base leading-relaxed mb-8 text-wrap">
                ¿Estás seguro de que deseas salir del sistema de gestión de la liga? Se cerrará tu sesión actual y
                cualquier cambio no guardado podría perderse.
            </p>
            <!-- Actions -->
            <div class="flex flex-col-reverse sm:flex-row w-full gap-3">
                <button @click="closeModalLogout"
                    class="flex-1 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#111218] font-bold text-base transition-colors duration-200">
                    Cancelar
                </button>
                <button @click.prevent="logout"
                    class="flex-1 px-6 py-3 rounded-lg bg-[#1f44f9] hover:bg-[#1f44f9]/90 text-white font-bold text-base shadow-lg shadow-[#1f44f9]/20 transition-all duration-200">
                    Cerrar Sesión
                </button>
            </div>
        </div>
        <!-- Footer Decoration (Optional subtle football-themed pattern) -->
        <div class="h-1 bg-gradient-to-r from-[#1f44f9]/10 via-[#1f44f9] to-[#1f44f9]/10"></div>
    </div>
</template>
<script setup>
import axios from 'axios';

const props = defineProps({
    // No props needed for this modal
    showModalLogout: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['closeModalLogout']);
const closeModalLogout = () => {
    emit('closeModalLogout');
}
const logout = async () => {
    try {
        const token = localStorage.getItem('token');

        // El segundo parámetro es el BODY (vacío en este caso)
        // El tercer parámetro es el objeto de CONFIGURACIÓN
        const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Respuesta del servidor:', response.data);

        // Limpiar localstorage y redirigir
        localStorage.removeItem('token');
        location.href = '/';

    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Incluso si falla el servidor, limpia el localstorage por seguridad
        localStorage.removeItem('token');
    }
}</script>