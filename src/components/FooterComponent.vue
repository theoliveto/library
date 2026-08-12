<template>
    <v-footer app class="d-flex flex-row justify-space-between align-center py-2" color="blue-grey-darken-4">
        <div class="d-flex ga-3">
            <v-btn v-for="icon in icons" :icon="icon" :key="icon" density="comfortable" variant="text" />
        </div>

        <div>
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

</style>
