import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/categorias').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/categorias/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/categorias', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/categorias/${id}`, dto),
    excluir: (id: number) => api.delete(`/categorias/${id}`),
}