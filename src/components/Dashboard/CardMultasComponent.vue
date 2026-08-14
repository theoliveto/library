<template>
    <v-card class="mx-auto" elevation="3" max-width="368">
        <v-card-item title="Multas">
            <template #subtitle>
                <v-icon class="me-1 pb-1" color="warning" icon="mdi-credit-card-refresh-outline" size="18" />
                Total de recorrências
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row class="align-center" density="compact">
                <v-col class="text-display-large font-weight-light" cols="6">64</v-col>

                <v-col class="text-right" cols="6">
                    <v-icon color="warning" icon="mdi-currency-usd-off" size="70" />
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-plus-box-outline">
                <v-list-item-subtitle>44 (15 dias)</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-minus-box-outline">
                <v-list-item-subtitle>20 (15 dias)</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-expand-transition>
            <div v-if="expand">
                <v-list class="bg-transparent">
                    <v-list-item
                        v-for="item in multas"
                        :key="item.record"
                        :append-icon="item.icon"
                        :subtitle="item.book"
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
        name: 'CardMultasComponent',
        data () {
            return {
                multas: [
                    { record: 'Oliveto Vinicius Di Domenico', icon: 'mdi-plus-box-outline', book: 'Outliers: Fora de Série' },
                    { record: 'Iandra Paz Di Domenico', icon: 'mdi-plus-box-outline', book: 'Entendes O Que Lês?' },
                    { record: 'Oliveto Vinicius Di Domenico', icon: 'mdi-minus-box-outline', book: 'Dom Casmurro' },
                ],

                expand: false,
            }
        },
    }
</script>
