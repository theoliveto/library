import { api } from '../api'

export interface ModelDto {
    id: number
    livroId: number | null
    livro: string | null
    patrimonio: string
    localizacao: string | null
    ean: string
    aquisicao: string
    valorAquisicao: number
    status: string 
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/exemplares').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/exemplares/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/exemplares', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/exemplares/${id}`, dto),
    excluir: (id: number) => api.delete(`/exemplares/${id}`),
}