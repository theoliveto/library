import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    razaoSocial: string
    cpfCnpj: string
    email: string
    celular: string
    telefone: string | null
    nacionalidade: string
    siteOficial: string
    fundacao: string
    cep: string
    endereco: string
    cidade: string
    estado: string
    bairro: string
    numero: string | null
    complemento: string | null
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/editoras').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/editoras/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/editoras', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/editoras/${id}`, dto),
    excluir: (id: number) => api.delete(`/editoras/${id}`),
}