import { api } from '../api'

export interface ModelDto {
    id: number
    pessoaId: number | null
    pessoa: string | null
    exemplarId: number | null
    exemplar: string | null
    emprestimo: string 
    previsaoDevolucao: string
    devolucao: string
    status: string 
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/emprestimos').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/emprestimos/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/emprestimos', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/emprestimos/${id}`, dto),
    excluir: (id: number) => api.delete(`/emprestimos/${id}`),
}