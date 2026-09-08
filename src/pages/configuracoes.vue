<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-5">
                <v-sheet elevation="2">
                    <v-tabs v-model="tab" color="blue-lighten-2" bg-color="blue-grey-darken-4">
                        <v-tab value="gerais" prepend-icon="mdi-cog-outline">Gerais</v-tab>
                        <v-tab value="notificacoes" prepend-icon="mdi-bell-outline">Notificações</v-tab>
                        <v-tab value="personalizacao" prepend-icon="mdi-pencil">Personalização</v-tab>
                    </v-tabs>

                    <v-divider></v-divider>

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="gerais">
                            <v-sheet class="pa-5">
                                
                            </v-sheet>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="notificacoes">
                            <v-sheet class="pa-5">
                                
                            </v-sheet>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="personalizacao">
                            <v-sheet class="pa-5">
                                
                            </v-sheet>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-sheet>
            </v-container>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'

    export default defineComponent ({
        name: 'ConfiguracoesPage',

        data() {
            return {
                tab: 'gerais',
            }
        },

        components: {
            HeaderComponent,
            FooterComponent,
        },

        mounted () {
            document.title = this.$route.meta.title as string
        },
    })
</script>
