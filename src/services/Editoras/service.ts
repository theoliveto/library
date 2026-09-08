import { api } from '../api'

export interface ModelDto {
    cdEditora: number
    dsEditora: string
    nrCnpj: string
    nrCep: string
    dsCidade: string
    dsEstado: string
    dsEndereco: string
    dsBairro: string
    nrNumero: string | null
    dsComplemento: string | null
    dsEmail: string
    nrTelefone: string | null
    dsSiteOficial: string | null
    dtFundacao: string
    dsObservacoes: string | null
    xAtivo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'cdEditora'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/editoras').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/editoras/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/editoras', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/editoras/${id}`, dto),
    excluir: (id: number) => api.delete(`/editoras/${id}`),
}