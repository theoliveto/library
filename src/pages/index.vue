<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container fluid class="mt-n5">
        <v-breadcrumbs :items="items">
            <template #divider>
                <v-icon icon="mdi-chevron-right" />
            </template>
        </v-breadcrumbs>

        <v-row class="align-center justify-center mt-n3" density="comfortable">
          <v-col cols="3">
            <CardPerfisComponent />
          </v-col>

          <v-col cols="3">
            <CardLivrosComponent />
          </v-col>

          <v-col cols="3">
            <CardMultasComponent />
          </v-col>

          <v-col cols="3">
            <CardMultasComponent />
          </v-col>
        </v-row>

        <v-row class="align-center justify-center mt-10" density="comfortable">
          <v-col cols="6">
            <GraphComponent
              titulo="Vendas"
              subtitulo="Valores totais mensais"
              nome-serie="Vendas"
              :categorias="[
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun'
              ]"
              :valores="[
                120,
                180,
                150,
                220,
                280,
                320
              ]"
            />
          </v-col>

          <v-col cols="6">
            <GraphComponent
              tipo="area"
              titulo="Acessos"
              subtitulo="Número de acessos ao sistema"
              nome-serie="Acessos"
              :categorias="[
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun'
              ]"
              :valores="[
                120,
                180,
                150,
                220,
                280,
                320
              ]"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import CardPerfisComponent from '@/components/Dashboard/CardPerfisComponent.vue'
  import CardLivrosComponent from '@/components/Dashboard/CardLivrosComponent.vue'
  import CardMultasComponent from '@/components/Dashboard/CardMultasComponent.vue'
  import GraphComponent from '@/components/GraphComponent.vue'

  interface Breadcrumb {
    title: string
    disabled: boolean
    href?: string
  }

  export default {
    name: 'IndexPage',
    data () {
      return {
        user: 'Oliveto',

        items: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Dashboard', disabled: true },
        ] as Breadcrumb[],
      }
    },
    components: {
      HeaderComponent,
      CardPerfisComponent,
      CardLivrosComponent,
      CardMultasComponent,
      GraphComponent,
    },
  }
</script>
