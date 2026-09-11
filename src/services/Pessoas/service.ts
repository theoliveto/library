import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    razaoSocial: string
    usuarioId: number | null
    usuario: string | null
    cpfCnpj: string
    email: string
    celular: string
    telefone: string
    nascimento: string
    genero: string
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
    obterTodos: () => api.get<ModelDto[]>('/pessoas').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/pessoas/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/pessoas', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/pessoas/${id}`, dto),
    excluir: (id: number) => api.delete(`/pessoas/${id}`),

    async verificarCpf(cpf: string, cdPessoa?: number) {
        const response = await api.get('/pessoas/verificar-cpf', {
            params: { cpf, cdPessoa }
        })
    
        return response.data
    },

    async verificarEmail(email: string, cdPessoa?: number) {
        const response = await api.get('/pessoas/verificar-email', {
            params: { email, cdPessoa }
        })
    
        return response.data
    },
}