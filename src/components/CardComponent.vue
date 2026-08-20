<template>
    <v-card class="mx-auto" elevation="3" max-width="368">
        <v-card-item :title="titulo">
            <template #subtitle>
                <v-icon
                    class="me-1 pb-1"
                    :color="corIconeSubtitulo"
                    :icon="iconeSubtitulo"
                    size="18"
                />
                {{ subTitulo }}
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row class="align-center" density="compact">
                <v-col class="text-display-large font-weight-light" cols="6">{{ totais }}</v-col>

                <v-col class="text-right" cols="6">
                    <v-icon
                        :color="corIconePrincipal"
                        :icon="iconePrincipal"
                        size="70"
                    />
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" :prepend-icon="iconeSubInformacao">
                <v-list-item-subtitle>{{ subInformacao }}</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-divider />

        <v-card-actions>
            <v-btn text="Ver detalhes" />
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: 'CardComponent',
        props: {
            titulo: { type: String, required: true },
            subTitulo: { type: String, required: true },
            iconeSubtitulo: { type: String, default: 'mdi-pencil-plus-outline' },
            corIconeSubtitulo: { type: String, default: 'primary' },
            totais: { type: Number, required: true },
            iconePrincipal: { type: String, default: 'mdi-book-plus-multiple-outline' },
            corIconePrincipal: { type: String, default: 'primary' },
            subInformacao: { type: String, required: true },
            iconeSubInformacao: { type: String, default: 'mdi-arrow-u-right-top-bold' },
        },
    }
</script>
