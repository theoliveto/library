import { api } from '../api'

export interface LoginRequest {
    email: string
    senha: string
}

export interface UsuarioAuthDto {
    id: number
    nome: string
    login: string
}

export interface LoginResponse {
    token: string
    usuario: UsuarioAuthDto
}

export const authService = {
    async login(dto: LoginRequest): Promise<LoginResponse> {
        return {
            token: 'token-teste',
            usuario: {
                id: 1,
                nome: 'Administrador',
                login: dto.email,
            },
        }
    },
}