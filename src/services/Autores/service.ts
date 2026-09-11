import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    nascimento: string
    falecimento: string | null
    nacionalidade: string
    genero: string
    siteOficial: string | null
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/autores').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/autores/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/autores', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/autores/${id}`, dto),
    excluir: (id: number) => api.delete(`/autores/${id}`),
}