<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container class="mt-5">
        <v-row class="align-center justify-center" density="comfortable">
          <v-col cols="3">
            <v-card class="mx-auto" subtitle="prepend and append" title="Icons">
              <template #prepend>
                <v-icon color="primary" icon="mdi-account" />
              </template>

              <template #append>
                <v-icon color="success" icon="mdi-check" />
              </template>

              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card class="mx-auto" subtitle="prepend and append" title="Icons">
              <template #prepend>
                <v-icon color="primary" icon="mdi-account" />
              </template>

              <template #append>
                <v-icon color="success" icon="mdi-check" />
              </template>

              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card class="mx-auto" subtitle="prepend and append" title="Icons">
              <template #prepend>
                <v-icon color="primary" icon="mdi-account" />
              </template>

              <template #append>
                <v-icon color="success" icon="mdi-check" />
              </template>

              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card class="mx-auto" subtitle="prepend and append" title="Icons">
              <template #prepend>
                <v-icon color="primary" icon="mdi-account" />
              </template>

              <template #append>
                <v-icon color="success" icon="mdi-check" />
              </template>

              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script lang="ts">
  import FooterComponent from '@/components/FooterComponent.vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'

  export default {
    name: 'IndexPage',
    data () {
      return {
        user: 'Oliveto',
      }
    },
    components: {
      HeaderComponent,
      FooterComponent,
    },
  }
</script>
