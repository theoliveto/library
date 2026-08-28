import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService, type UsuarioAuthDto } from '@/services/Auth/service'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(
        localStorage.getItem('auth_token')
    )

    const usuario = ref<UsuarioAuthDto | null>(
        JSON.parse(localStorage.getItem('auth_usuario') || 'null')
    )

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

        localStorage.setItem(
            'auth_token',
            resposta.token
        )

        localStorage.setItem(
            'auth_usuario',
            JSON.stringify(resposta.usuario)
        )
    }

    function logout() {
        token.value = null
        usuario.value = null

        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_usuario')
    }

    async function restaurarSessao() {
        const tokenSalvo = localStorage.getItem('token')
    
        if (!tokenSalvo) {
            return
        }
    
        token.value = tokenSalvo
    
        try {
            usuario.value = await authService.obterUsuarioAtual()
        } catch {
            logout()
        }
    }

    return {
        usuario,
        token,
        autenticado,
        login,
        restaurarSessao,
        logout,
    }
})