<template>
    <div class="mt-20">
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        />

        <v-card class="mx-auto pa-12 pb-8" elevation="3" max-width="448" rounded="lg">
            <v-text-field
                label="E-mail"
                variant="outlined"
                persistent-placeholder
            />

            <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
                <span class="hidden">Password</span>

                <a
                    class="text-body-small text-decoration-none text-blue"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Esqueci minha senha
                </a>
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                label="Senha"
                variant="outlined"
                persistent-placeholder
                @click:append-inner="visible = !visible"
            />

            <v-card
                class="mb-6"
                color="surface-variant"
                variant="tonal"
            >
                <v-card-text class="text-medium-emphasis text-body-small text-justify">
                    <strong>Atenção: </strong> Após <strong>3 tentativas</strong> consecutivas de login malsucedidas,
                    sua conta será bloqueada por 3 horas.
                    <br><br>
                    Se necessário logar agora, clique em <i>"Esqueci minha senha"</i>
                    para então resetar ela.
                </v-card-text>
            </v-card>

            <v-btn
                class="mb-4"
                color="blue"
                size="large"
                variant="tonal"
                block
                to="/"
            >
                Entrar
            </v-btn>
        </v-card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent ({
        name: 'LoginPage',
        data () {
            return {
                user: 'Oliveto',
                visible: false,
            }
        },
    })
</script>

<style scoped>
    .mt-20 {
        margin-top: 90px;
    }

    .hidden {
        visibility: hidden;
    }
</style>
