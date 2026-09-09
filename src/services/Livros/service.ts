import { api } from '../api'

export interface ModelDto {
    cdLivro: number
    dsLivro: string
    dsSubtitulo: string | null
    cdAutor: number | null
    dsAutor: string | null
    cdEditora: number | null
    dsEditora: string | null
    nrIsbn10: string
    nrIsbn13: string
    dsIdioma: string
    nrEdicao: string | null
    nrPaginas: string 
    dtPublicacao: string
    cdCategoria: number | null
    dsCategoria: string | null
    dsSinopse: string | null
    imLivro: string | null
    dsObservacoes: string | null
    xAtivo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'cdLivro'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/livros').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/livros/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/livros', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/livros/${id}`, dto),
    excluir: (id: number) => api.delete(`/livros/${id}`),
}