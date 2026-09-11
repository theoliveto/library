import { api } from '../api'

export interface LoginRequest {
    dsLogin: string
    dsSenha: string
}

export interface UsuarioAuthDto {
    id: number
    descricao: string
    login: string
    email: string
    perfil: string
    administrador: boolean
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
                id: data.usuario.id,
                descricao: data.usuario.descricao,
                login: data.usuario.login,
                email: data.usuario.email,
                perfil: data.usuario.perfil,
                administrador: data.usuario.administrador,
            }
        }
    },

    obterUsuarioAtual: async (): Promise<UsuarioAuthDto> => {
        const response = await api.get('/auth/me')
    
        const usuario = response.data
    
        return {
            id: usuario.cD_USUARIO,
            descricao: usuario.descricao,
            login: usuario.login,
            email: usuario.email,
            perfil: usuario.perfil,
            administrador: usuario.administrador,
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