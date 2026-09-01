<template>
  <v-app>
    <v-main>
      <router-view />
      <SnackbarComponent />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import SnackbarComponent from '@/components/SnackbarComponent.vue'
  import { useAuthStore } from '@/stores/auth'
  import { onMounted } from 'vue'

  const authStore = useAuthStore()

  onMounted(async () => {
    await authStore.restaurarSessao()
  })
</script>

<style>
  html {
    overflow: hidden;
  }

  #app {
    font-family: 'Geist Variable', sans-serif;
    letter-spacing: -1px;
  }
</style>
