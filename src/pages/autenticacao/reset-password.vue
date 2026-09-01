<template>
    <div class="mt-20">
        <v-img class="mx-auto my-6" max-width="228" src="/logo.png" />

        <v-card class="mx-auto pa-12 pb-8" elevation="3" max-width="448" rounded="lg">
            <div class="text-h5 mb-2">Redefinir senha</div>
            <div class="text-body-2 text-medium-emphasis mb-6">Informe sua nova senha abaixo.</div>
            <v-alert v-if="mensagem" :type="tipoMensagem" variant="tonal" class="mb-6">{{ mensagem }}</v-alert>

            <template v-if="tokenValido">
                <v-text-field
                    v-model="novaSenha"
                    label="Nova senha"
                    variant="outlined"
                    :type="mostrarSenha ? 'text' : 'password'"
                    :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="mostrarSenha = !mostrarSenha"
                />

                <v-text-field
                    v-model="confirmarSenha"
                    label="Confirmar nova senha"
                    variant="outlined"
                    :type="mostrarConfirmacao ? 'text' : 'password'"
                    :append-inner-icon="mostrarConfirmacao ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="mostrarConfirmacao = !mostrarConfirmacao"
                />

                <v-btn
                    class="mt-4"
                    color="blue"
                    size="large"
                    variant="tonal"
                    block
                    :loading="carregando"
                    :disabled="carregando"
                    @click="redefinirSenha"
                    text="Redefinir senha"
                />
            </template>

            <template v-else-if="tokenValidado">
                <v-btn
                    color="blue"
                    variant="tonal"
                    block
                    @click="voltarLogin"
                    text="Voltar para o login"
                />
            </template>
        </v-card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { passwordResetService } from '@/services/Auth/passwordResetService'

    export default defineComponent({
        name: 'ResetPasswordPage',

        data() {
            return {
                route: useRoute(),
                router: useRouter(),

                token: '',
                tokenValido: false,
                tokenValidado: false,

                novaSenha: '',
                confirmarSenha: '',

                mostrarSenha: false,
                mostrarConfirmacao: false,

                carregando: false,

                mensagem: '',
                tipoMensagem: 'error' as 'error' | 'success' | 'warning' | 'info',
            }
        },

        async mounted() {
            document.title = this.$route.meta.title as string

            const token = this.route.query.token

            if (typeof token !== 'string' || !token) {
                this.mensagem = 'Token de recuperação não informado.'
                this.tokenValidado = true
                return
            }

            this.token = token

            await this.validarToken()
        },

        methods: {
            async validarToken() {
                try {
                    const response = await passwordResetService.validarToken(this.token)

                    this.tokenValido = response.valido
                    this.mensagem = response.mensagem

                    if (response.valido) {
                        this.mensagem = ''
                    }

                } catch (error: any) {
                    console.error(error)

                    this.tokenValido = false

                    this.mensagem = error.response?.data?.mensagem ?? 'O token de recuperação é inválido ou expirou.'

                    this.tipoMensagem = 'error'
                } finally {
                    this.tokenValidado = true
                }
            },

            async redefinirSenha() {
                if (!this.novaSenha) {
                    this.mensagem = 'Informe a nova senha.'
                    this.tipoMensagem = 'warning'
                    return
                }

                if (this.novaSenha !== this.confirmarSenha) {
                    this.mensagem = 'As senhas não coincidem.'
                    this.tipoMensagem = 'warning'
                    return
                }

                try {
                    this.carregando = true
                    this.mensagem = ''

                    await passwordResetService.redefinirSenha({
                        token: this.token,
                        novaSenha: this.novaSenha,
                    })

                    this.tokenValido = false

                    this.mensagem = 'Senha redefinida com sucesso!'

                    this.tipoMensagem = 'success'

                    setTimeout(() => { this.router.push('/login') }, 2000)

                } catch (error: any) {
                    console.error(error)

                    this.mensagem = error.response?.data?.message ?? 'Não foi possível redefinir a senha.'

                    this.tipoMensagem = 'error'

                } finally {
                    this.carregando = false
                }
            },

            voltarLogin() {
                this.router.push('/login')
            }
        }
    })
</script>

<style scoped>
    .mt-20 {
        margin-top: 60px;
    }
</style>