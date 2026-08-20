<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container fluid class="mt-n5">
        <v-row class="align-center justify-center mt-10" density="comfortable">
          <v-col cols="3">
            <CardComponent
              titulo="Livros"
              sub-titulo="Total de registros"
              :totais="60"
              sub-informacao="20 Reservas"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script lang="ts">
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import CardComponent from '@/components/CardComponent.vue'
  import FooterComponent from '@/components/FooterComponent.vue'

  export default {
    name: 'IndexPage',

    components: {
      HeaderComponent,
      CardComponent,
      FooterComponent,
    },

    mounted () {
      document.title = this.$route.meta.title as string
    },
  }
</script>
