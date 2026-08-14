<template>
    <v-card class="ml-3" elevation="2" rounded="lg" max-width="782">
        <v-card-title class="d-flex align-center">
            <div class="font-spacing">
                <div class="text-headline-small font-weight-medium">{{ titulo }}</div>
                <div class="text-title-medium font-weight-light">{{ subtitulo }}</div>
            </div>

            <v-spacer />

            <v-btn-toggle v-if="mostrarTipos" v-model="tipoAtual" density="compact" mandatory>
                <v-btn value="bar" size="small" text="Barras" />
                <v-btn value="line" size="small" text="Linha" />
                <v-btn value="area" size="small" text="Área" />
            </v-btn-toggle>
        </v-card-title>

        <v-card-text>
            <apexchart
                :type="tipoAtual"
                :height="altura"
                :options="opcoes"
                :series="series"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'

    const props = defineProps({
        titulo: {
            type: String,
            default: 'Gráfico',
        },

        subtitulo: {
            type: String,
            default: 'Gráfico',
        },

        categorias: {
            type: Array,
            default: () => [],
        },

        valores: {
            type: Array,
            default: () => [],
        },

        nomeSerie: {
            type: String,
            default: 'Valores',
        },

        tipo: {
            type: String,
            default: 'bar',
        },

        altura: {
            type: [String, Number],
            default: 350,
        },

        mostrarTipos: {
            type: Boolean,
            default: true,
        },
    })

    const tipoAtual = ref(props.tipo)

    const series = computed(() => [
        {
            name: props.nomeSerie,
            data: props.valores,
        },
    ])

    const opcoes = computed(() => ({
        chart: {
            toolbar: {
                show: false,
            },
            animations: {
                enabled: true,
            },
        },

        xaxis: {
            categories: props.categorias,
        },

        dataLabels: {
            enabled: false,
        },

        stroke: {
            curve: 'smooth',
            width: 3,
        },

        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '55%',
            },
        },

        tooltip: {
            enabled: true,
        },

        legend: {
            position: 'top',
        },

        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 280,
                    },

                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    }))
</script>
