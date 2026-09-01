import { api } from '../api'

export interface LoginRequest {
    dsLogin: string
    dsSenha: string
}

export interface UsuarioAuthDto {
    cdUsuario: number
    dsUsuario: string
    dsLogin: string
    dsEmail: string
    xAdministrador: boolean
}

export interface LoginResponse {
    token: string
    usuario: UsuarioAuthDto
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    token: string
    novaSenha: string
}

export const authService = {

    async login(dto: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', dto)

        return response.data
    },

    obterUsuarioAtual: async (): Promise<UsuarioAuthDto> => {
        const response = await api.get<UsuarioAuthDto>('/auth/me')
    
        return response.data
    },

    async solicitarRecuperacaoSenha(dto: ForgotPasswordRequest) {
        const response = await api.post('/auth/forgot-password', dto)

        return response.data
    },

    async validarTokenRecuperacao(token: string) {
        const response = await api.get(`/auth/reset-password/${token}`)

        return response.data
    },

    async redefinirSenha(dto: ResetPasswordRequest) {
        const response = await api.post('/auth/reset-password', dto)

        return response.data
    }
}