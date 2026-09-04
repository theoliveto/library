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
        const response = await api.post('/auth/login', dto)
    
        const data = response.data
    
        return {
            token: data.token,
    
            usuario: {
                cdUsuario: data.usuario.cD_USUARIO,
                dsUsuario: data.usuario.dS_USUARIO,
                dsLogin: data.usuario.dS_LOGIN,
                dsEmail: data.usuario.dS_EMAIL,
                xAdministrador: data.usuario.x_ADMINISTRADOR,
            }
        }
    },

    obterUsuarioAtual: async (): Promise<UsuarioAuthDto> => {
        const response = await api.get('/auth/me')
    
        const usuario = response.data
    
        return {
            cdUsuario: usuario.cD_USUARIO,
            dsUsuario: usuario.dS_USUARIO,
            dsLogin: usuario.dS_LOGIN,
            dsEmail: usuario.dS_EMAIL,
            xAdministrador: usuario.x_ADMINISTRADOR,
        }
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