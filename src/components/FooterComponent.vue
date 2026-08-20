<template>
    <v-footer app class="d-flex flex-row justify-space-between align-center py-2 footer-sidebar" color="blue-lighten-5">
        <div class="d-flex font-color">
            <v-btn v-for="icon in icons" :icon="icon" :key="icon" density="comfortable" variant="text" />
        </div>

        <div class="font-color">
            {{ new Date().getFullYear() }} — <strong>Library</strong>
        </div>
    </v-footer>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'FooterComponent',
        data () {
            return {
                icons: ['mdi-facebook', 'mdi-instagram', 'mdi-linkedin', 'mdi-github'],
            }
        },
    })
</script>

<style scoped>
    .font-color {
        color: #022a4b;
    }

    .footer-sidebar {
        box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.12);
    }
</style>
