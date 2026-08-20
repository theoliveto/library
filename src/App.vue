<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<style>
  html {
    overflow: hidden;
  }

  #app {
    font-family: 'Geist Variable', sans-serif;
    letter-spacing: -1px;
  }
</style>
