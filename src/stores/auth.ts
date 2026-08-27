import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService, type UsuarioAuthDto } from '@/services/Auth/authService'

export const useAuthStore = defineStore('auth', () => {
    const usuario = ref<UsuarioAuthDto | null>(null)
    const token = ref<string | null>(null)

    const autenticado = computed(() => {
        return token.value !== null
    })

    async function login(login: string, senha: string) {
        const resposta = await authService.login({
            dsLogin: login,
            dsSenha: senha,
        })

        token.value = resposta.token
        usuario.value = resposta.usuario
    }

    function logout() {
        token.value = null
        usuario.value = null
    }

    return {
        usuario,
        token,
        autenticado,
        login,
        logout,
    }
})