<template>
    <div class="mt-20">
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="/logo.png"
        />

        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="3"
            max-width="448"
            rounded="lg"
        >
            <div class="text-h6 mb-2">
                Esqueci minha senha
            </div>

            <div class="text-body-2 text-medium-emphasis mb-6">
                Informe seu e-mail para receber as instruções
                para redefinir sua senha.
            </div>

            <v-text-field
                v-model="email"
                label="E-mail"
                variant="outlined"
                persistent-placeholder
                type="email"
                :disabled="carregando"
            />

            <v-alert
                v-if="mensagem"
                class="mb-6"
                :type="sucesso ? 'success' : 'error'"
                variant="tonal"
            >
                {{ mensagem }}
            </v-alert>

            <v-btn
                class="mb-4"
                color="blue"
                size="large"
                variant="tonal"
                block
                :loading="carregando"
                :disabled="carregando"
                text="Enviar"
                @click="enviar"
            />

            <v-btn
                variant="text"
                block
                :disabled="carregando"
                @click="voltarLogin"
            >
                Voltar para o login
            </v-btn>
        </v-card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { authService } from '@/services/Auth/service'
    import router from '@/router'

    export default defineComponent({
        name: 'ForgotPasswordPage',

        data() {
            return {
                email: '',
                carregando: false,
                mensagem: '',
                sucesso: false,
            }
        },

        methods: {
            async enviar() {
                this.mensagem = ''
                this.sucesso = false

                if (!this.email.trim()) {
                    this.mensagem = 'Informe o seu e-mail.'
                    return
                }

                try {
                    this.carregando = true

                    const resposta =
                        await authService.solicitarRecuperacaoSenha({
                            email: this.email.trim(),
                        })

                    this.sucesso = true
                    this.mensagem = resposta.mensagem
                } catch (error: any) {
                    this.mensagem =
                        error.response?.data?.mensagem ??
                        'Não foi possível solicitar a recuperação da senha.'
                } finally {
                    this.carregando = false
                }
            },

            voltarLogin() {
                router.push('/login')
            },
        },
    })
</script>

<style scoped>
    .mt-20 {
        margin-top: 60px;
    }
</style>