<template>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" location="bottom right" :color="snackbarColor" elevation="6">
        <div class="d-flex align-center">
            <v-icon :icon="snackbarIcon" class="mr-3" />
            <span>{{ snackbar.message }}</span>
        </div>

        <template #actions>
            <v-btn icon="mdi-close" variant="text" size="small" @click="close" />
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useSnackbar } from '@/utils/useSnackbar'

const { snackbar, close } = useSnackbar()

const snackbarColor = computed(() => {
    switch (snackbar.type) {
        case 'success':
            return 'success'

        case 'error':
            return 'error'

        case 'warning':
            return 'warning'

        case 'info':
            return 'info'

        default:
            return 'info'
    }
})

const snackbarIcon = computed(() => {
    switch (snackbar.type) {

        case 'success':
            return 'mdi-check-circle'

        case 'error':
            return 'mdi-alert-circle'

        case 'warning':
            return 'mdi-alert'

        case 'info':
            return 'mdi-information'

        default:
            return 'mdi-information'
    }
})
</script>
