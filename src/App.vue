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
