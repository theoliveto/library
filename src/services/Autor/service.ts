import { api } from '../api'

export interface ModelDto {
    cdAutor: number
    dsAutor: string
    dtNascimento: string
    dtFalecimento: string | null
    dsPais: string
    dsGenero: string
    dsSiteOficial: string | null
    imFoto: string | null
    dsObservacoes: string | null
    xAtivo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'cdAutor'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/autores').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/autores/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/autores', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/autores/${id}`, dto),
    excluir: (id: number) => api.delete(`/autores/${id}`),
}