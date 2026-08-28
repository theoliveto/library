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

export const authService = {
    async login(dto: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', dto)
        return response.data
    },

    async obterUsuarioAtual(): Promise<UsuarioAuthDto> {
        const response = await api.get<UsuarioAuthDto>('/auth/me')
        return response.data
    }
}