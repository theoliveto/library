import { api } from '../api'

export interface ModelDto {
    id: number
    descricao: string
    subtitulo: string | null
    autorId: number | null
    autor: string | null
    editoraId: number | null
    editora: string | null
    categoriaId: number | null
    categoria: string | null
    isbn: string
    idioma: string
    edicao: string | null
    paginas: string 
    publicacao: string
    sinopse: string | null
    imagemCapa: string | null
    observacoes: string | null
    ativo: boolean
}

export type ModelCreateDto = Omit<ModelDto, 'id'>
export type ModelUpdateDto = ModelCreateDto

export const modelService = {
    obterTodos: () => api.get<ModelDto[]>('/livros').then(r => r.data),
    obterPorId: (id: number) => api.get<ModelDto>(`/livros/${id}`).then(r => r.data),
    criar: (dto: ModelCreateDto) => api.post<ModelDto>('/livros', dto).then(r => r.data),
    atualizar: (id: number, dto: ModelUpdateDto) => api.put(`/livros/${id}`, dto),
    excluir: (id: number) => api.delete(`/livros/${id}`),
}