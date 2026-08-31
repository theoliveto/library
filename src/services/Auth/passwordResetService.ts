import { api } from '../api'

export interface ValidarTokenResponse {
    valido: boolean
    mensagem: string
}

export interface RedefinirSenhaDto {
    token: string
    novaSenha: string
}

export const passwordResetService = {
    async validarToken(token: string) {
        const response = await api.get<ValidarTokenResponse>(
            `/auth/reset-password/${encodeURIComponent(token)}`
        )

        return response.data
    },

    async redefinirSenha(dto: RedefinirSenhaDto) {
        const response = await api.post('/auth/reset-password', dto)

        return response.data
    }
}