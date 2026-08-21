import { api } from '../api'

export interface PessoaDto {
    cdPessoa: number
    dsPessoa: string
    nrCpf: string
    dsEmail: string
    nrTelefone: string
    dtNascimento: string
    dsGenero: string
    dsObservacoes: string | null
    xAtivo: boolean
    nrCep: string
    dsCidade: string
    dsEstado: string
    dsEndereco: string
    dsBairro: string
    nrNumero: string | null
    dsComplemento: string | null
}

export type PessoaCreateDto = Omit<PessoaDto, 'cdPessoa'>
export type PessoaUpdateDto = PessoaCreateDto

export const pessoaService = {
    obterTodos: () => api.get<PessoaDto[]>('/pessoas').then(r => r.data),
    obterPorId: (id: number) => api.get<PessoaDto>(`/pessoas/${id}`).then(r => r.data),
    criar: (dto: PessoaCreateDto) => api.post<PessoaDto>('/pessoas', dto).then(r => r.data),
    atualizar: (id: number, dto: PessoaUpdateDto) => api.put(`/pessoas/${id}`, dto),
    excluir: (id: number) => api.delete(`/pessoas/${id}`),
}