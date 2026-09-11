import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    login: string
    email: string
    senha: string
    perfil: string
    avatar: string | null
    administrador: boolean
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/usuarios').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/usuarios/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/usuarios', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/usuarios/${id}`, dto),
    excluir: (id: number) => api.delete(`/usuarios/${id}`),
}