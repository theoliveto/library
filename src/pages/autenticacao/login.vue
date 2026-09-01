<template>
    <div class="mt-20">
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="/logo.png"
        />

        <v-card class="mx-auto pa-12 pb-8" elevation="3" max-width="448" rounded="lg">
            <v-text-field 
                v-model="login"  
                label="Login" 
                variant="outlined" 
                persistent-placeholder 
            />

            <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
                <span class="hidden">Password</span>

                <a
                    class="text-body-small text-decoration-none text-blue"
                    href="/forgot-password"
                    rel="noopener noreferrer"
                >
                    Esqueci minha senha
                </a>
            </div>

            <v-text-field
                v-model="senha"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                label="Senha"
                variant="outlined"
                persistent-placeholder
                @click:append-inner="visible = !visible"
            />

            <v-card class="mb-6" color="surface-variant" variant="tonal">
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
                :loading="carregando"
                :disabled="carregando"
                @click="entrar"
                text="Entrar"
            />
        </v-card>

        <MessageComponent
            v-model="showErroLogin"
            title="Erro ao entrar"
            icon-title="mdi-alert-circle-outline"
            :message="mensagemErro"
            confirm-text="OK"
            confirm-color="primary"
            :show-cancel="false"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'
    import { useSnackbar } from '@/utils/useSnackbar'

    import MessageComponent from '@/components/MessageComponent.vue'

    export default defineComponent ({
        name: 'LoginPage',

        components: {
            MessageComponent
        },

        setup () {
            const {
                success,
                error,
                warning,
                info
            } = useSnackbar()

            return {
                success,
                error,
                warning,
                info
            }
        },

        data () {
            return {
                login: '',
                senha: '',
                visible: false,
                authStore: useAuthStore(),
                router: useRouter(),
                carregando: false,
                mensagemErro: '',
                showErroLogin: false
            }
        },
        
        mounted () {
            document.title = this.$route.meta.title as string
        },

        methods: {
            async entrar() {
                try {
                    this.carregando = true

                    await this.authStore.login(
                        this.login,
                        this.senha,
                    )

                    this.router.push('/')
                    this.success('Login realizado com sucesso.')
                } catch (error: any) {
                    this.mensagemErro = error.response?.data?.mensagem ?? 'Não foi possível realizar o login.'

                    this.showErroLogin = true
                } finally {
                    this.carregando = false
                }
            }
        }
    })
</script>

<style scoped>
    .mt-20 {
        margin-top: 60px;
    }

    .hidden {
        visibility: hidden;
    }
</style>
