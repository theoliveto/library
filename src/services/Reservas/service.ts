import { api } from '../api'

export interface ModelDto {
    id: number
    pessoaId: number
    exemplarId: number
    reserva: string
    prazo: string
    validade: string
    status: string
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/reservas').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/reservas/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/reservas', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/reservas/${id}`, dto),
    excluir: (id: number) => api.delete(`/reservas/${id}`),
}