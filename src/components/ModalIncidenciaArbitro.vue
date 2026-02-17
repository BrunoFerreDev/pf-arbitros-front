<template>
  <div
    class="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-4 bg-gray-900/50"
  >
    <div
      class="w-full max-w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200"
    >
      <div class="p-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="flex flex-col flex-1">
              <p
                class="text-[#111418] text-base font-semibold leading-normal pb-2 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-sm">category</span>
                Tipo de Incidencia
              </p>
              <select
                v-model="form.idIncidencia"
                class="w-full rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 px-4 bg-white outline-none transition-all"
              >
                <option disabled selected>
                  Seleccionar evento...
                </option>
                <option
                  v-for="gestion in props.catalogoGestion"
                  :key="gestion.id"
                  :value="gestion.id"
                >
                  {{ gestion.nombre }}
                </option>
              </select>
            </label>
          </div>

          <div class="flex flex-col gap-2">
            <label class="flex flex-col flex-1">
              <p
                class="text-[#111418] text-base font-semibold leading-normal pb-2 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-sm">schedule</span>
                Minuto del Partido
              </p>
              <div class="relative">
                <input
                  v-model.number="form.minuto"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-[#55a6f6]/50 border border-[#dbe0e6] bg-white h-14 placeholder:text-[#60758a] px-4 text-base font-normal leading-normal transition-all"
                  placeholder="ej. 45"
                  type="number"
                />
              </div>
            </label>
          </div>

          <div class="flex flex-col gap-2">
            <label class="flex flex-col flex-1">
              <p
                class="text-[#111418] text-base font-semibold leading-normal pb-2 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-sm"
                  >description</span
                >
                Observaciones o Motivos
              </p>
              <textarea
                v-model="form.observacion"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-[#55a6f6]/50 border border-[#dbe0e6] bg-white min-h-[140px] placeholder:text-[#60758a] p-4 text-base font-normal leading-normal transition-all"
                placeholder="Describa la razón de la incidencia..."
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      <div
        class="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3"
      >
        <button
          @click.prevent="cerrar"
          class="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-slate-200 hover:bg-slate-300 text-[#111418] text-sm font-bold transition-colors"
        >
          Cancelar
        </button>
        <button
          @click.prevent="confirmar"
          :disabled="loading"
          class="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-[#55a6f6] hover:bg-[#55a6f6]/90 text-white text-sm font-bold shadow-lg shadow-[#55a6f6]/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <span class="material-symbols-outlined text-lg mr-2">{{
            loading ? "sync" : "check_circle"
          }}</span>
          <span>{{ loading ? "Enviando..." : "Confirmar Evento" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

const props = defineProps({
  partidoId: {
    type: [Number, String],
    required: true,
  },
  catalogoGestion: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close", "success"]);

const loading = ref(false);

// Objeto reactivo siguiendo la estructura del Swagger
const form = reactive({
  partidoId: props.partidoId,
  idIncidencia: null,
  tipo: "",
  observacion: "",
  minuto: null,
});

const cerrar = () => {
  emit("close");
};

const confirmar = async () => {
  if (!form.idIncidencia || form.minuto === null) {
    alert("Por favor completa los campos obligatorios");
    return;
  }
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:8080/api/arbitros/partido/cargar-incidencia-gestion",
      {
        idPartido: props.partidoId,
        idIncidencia: form.idIncidencia,
        idArbitro: 1,
        tipo: form.tipo,
        observacion: form.observacion,
        minuto: form.minuto,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      },
    );

    if (response.status === 200) {
      emit("success");
      cerrar();
      location.reload();
    } else {
      console.error("Error en la respuesta");
    }
  } catch (error) {
    console.error("Error al enviar la incidencia:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  console.log("ModalIncidenciaArbitro mounted",props.catalogoGestion);
  
});
</script>