import { api } from '../api'

export interface ModelDto {
    cdExemplar: number
    cdLivro: number
    nrPatrimonio: string
    dsLocalizacao: string | null
    nrEan: string
    dtAquisicao: string | null
    vlAquisicao: number | null
    dsStatus: string 
    dsObservacoes: string | null
    xAtivo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'cdExemplar'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/exemplares').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/exemplares/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/exemplares', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/exemplares/${id}`, dto),
    excluir: (id: number) => api.delete(`/exemplares/${id}`),
}