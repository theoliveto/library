import { api } from '../api'

export interface ModelDto {
    id: number
    pessoaId: number | null
    pessoa: string | null
    emprestimoId: number | null
    emprestimo: string | null
    motivo: string
    valor: number
    data: string
    pagamento: string
    status: string
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/multas').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/multas/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/multas', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/multas/${id}`, dto),
    excluir: (id: number) => api.delete(`/multas/${id}`),
}