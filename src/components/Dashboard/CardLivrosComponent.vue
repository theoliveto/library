<template>
    <v-card class="mx-auto" elevation="3" max-width="368">
        <v-card-item title="Livros">
            <template #subtitle>
                <v-icon class="me-1 pb-1" color="primary" icon="mdi-pencil-plus-outline" size="18" />
                Total de cadastros
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row class="align-center" density="compact">
                <v-col class="text-display-large font-weight-light" cols="6">64</v-col>

                <v-col class="text-right" cols="6">
                    <v-icon color="primary" icon="mdi-book-plus-multiple-outline" size="70" />
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-arrow-u-right-top-bold">
                <v-list-item-subtitle>44 empréstimos</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-bookmark-check-outline">
                <v-list-item-subtitle>20 reservas</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-expand-transition>
            <div v-if="expand">
                <v-list class="bg-transparent">
                    <v-list-item
                        v-for="item in livros"
                        :key="item.record"
                        :append-icon="item.icon"
                        :subtitle="item.author"
                        :title="item.record"
                    />
                </v-list>
            </div>
        </v-expand-transition>

        <v-divider />

        <v-card-actions>
            <v-btn :text="!expand ? 'Ver detalhes' : 'Ocultar detalhes'" @click="expand = !expand" />
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: 'CardLivrosComponent',
        data () {
            return {
                livros: [
                    { record: 'Outliers: Fora de Série', icon: 'mdi-arrow-u-right-top-bold', author: 'Malcolm Gladwell' },
                    { record: 'Entendes O Que Lês?', icon: 'mdi-bookmark-check-outline', author: 'Gordon D. Fee e Douglas Stuart' },
                    { record: 'Dom Casmurro', icon: 'mdi-arrow-u-right-top-bold', author: 'Machado de Assis' },
                ],

                expand: false,
            }
        },
    }
</script>
