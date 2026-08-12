<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container class="mt-5">
                <v-breadcrumbs :items="items">
                    <template #divider>
                        <v-icon icon="mdi-chevron-right" />
                    </template>
                </v-breadcrumbs>
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
        name: 'DevolucoesPage',
        data () {
            return {
                items: [
                    { title: 'Home', disabled: false, href: '/' },
                    { title: 'Circulação', disabled: true },
                    { title: 'Devoluções', disabled: true, href: '/devolucoes' },
                ],
            }
        },
        components: {
            HeaderComponent,
            FooterComponent,
        },
    })
</script>
