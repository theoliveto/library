import { api } from '../api'

export interface ModelDto {
    cdUsuario: number
    dsUsuario: string
    dsLogin: string
    dsEmail: string
    dsSenha: string
    dsObservacoes: string | null
    xAtivo: boolean
    xAdministrador: boolean
    imPerfil: string | null
}

export type ModelCreateDto = Omit<ModelDto, 'cdUsuario'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/usuarios').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/usuarios/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/usuarios', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/usuarios/${id}`, dto),
    excluir: (id: number) => api.delete(`/usuarios/${id}`),
}