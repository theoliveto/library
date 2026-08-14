<template>
    <v-card class="mx-auto" elevation="3" max-width="368">
        <v-card-item title="Perfis">
            <template #subtitle>
                <v-icon class="me-1 pb-1" color="error" icon="mdi-pencil-plus-outline" size="18" />
                Total de cadastros
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row class="align-center" density="compact">
                <v-col class="text-display-large font-weight-light" cols="6">64</v-col>

                <v-col class="text-right" cols="6">
                    <v-icon color="error" icon="mdi-account-multiple-plus-outline" size="70" />
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
                <v-list-item-subtitle>44 pessoas</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-account-edit-outline">
                <v-list-item-subtitle>20 usuários</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-expand-transition>
            <div v-if="expand">
                <v-list class="bg-transparent">
                    <v-list-item
                        v-for="item in perfis"
                        :key="item.record"
                        :append-icon="item.icon"
                        :subtitle="item.type"
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
        name: 'CardPerfisComponent',
        data () {
            return {
                perfis: [
                    { record: 'Oliveto Vinicius Di Domenico', icon: 'mdi-account-group-outline', type: 'Pessoa' },
                    { record: 'Iandra Paz Di Domenico', icon: 'mdi-account-group-outline', type: 'Pessoa' },
                    { record: 'oliveto', icon: 'mdi-account-edit-outline', type: 'Usuário' },
                ],

                expand: false,
            }
        },
    }
</script>
