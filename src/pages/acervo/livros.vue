<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-5">
                <TableComponent
                    title="Livros"
                    icon="mdi-book"
                    item-key="cdLivro"
                    :headers="headers"
                    :items="livros"
                    @add="inserir"
                    @edit="editar"
                    @delete="deletar"
                    @reset="reiniciar"
                />
            </v-container>

            <DialogComponent
                v-model="dialog"
                v-model:active-switch="formModel.xAtivo"
                v-model:tab-model="currentTab"
                :tabs="tabsConfig"
                :title="`${editando ? 'Editando' : 'Inserindo'} um livro`"
                :subtitle="`${editando ? 'Atualizar' : 'Cadastrar'} registro`"
                @save="salvar"
            >
                <v-tabs-window v-model="currentTab" class="dialog-tabs-window">
                    <v-tabs-window-item value="dados-gerais">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.dsLivro"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(150)]"
                                        >
                                            <template #label>
                                                Título <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.dsSubtitulo"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(150)]"
                                        >
                                            <template #label>
                                                Sub-Título <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.nrIsbn10"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(10)]"
                                        >
                                            <template #label>
                                                Nr. ISBN 10 <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.nrIsbn13"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(13)]"
                                        >
                                            <template #label>
                                                Nr. ISBN 13 <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12">
                                        <v-textarea
                                            class="mt-n2"
                                            v-model="formModel.dsSinopse"
                                            label="Sinópse"
                                            row-height="25"
                                            rows="3"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(200)]"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="12">
                                        <v-textarea
                                            class="mt-n2"
                                            v-model="formModel.dsObservacoes"
                                            label="Observações"
                                            row-height="25"
                                            rows="3"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(500)]"
                                        />
                                    </v-col>
                                </v-row>
                            </template>
                        </v-sheet>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="especificacoes">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="Idioma"
                                            v-model="formModel.dsIdioma"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="País de Publicação"
                                            v-model="formModel.dsPaisPublicacao"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.dtPublicacao"
                                            prepend-icon=""
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required()]"
                                            @update:model-value="value => formModel.dtPublicacao = dateMask(value)"
                                        >
                                            <template #label>
                                                Dt. Publicação <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="Nr. Páginas"
                                            v-model="formModel.nrPaginas"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="Edição"
                                            v-model="formModel.nrEdicao"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="Volume"
                                            v-model="formModel.nrVolume"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>
                                </v-row>
                            </template>
                        </v-sheet>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="vinculos">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.cdAutor"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        >
                                            <template #label>
                                                Autor <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.cdCategoria"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Categoria <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.cdExemplar"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Exemplar <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.cdEditora"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Editora <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-sheet>
                    </v-tabs-window-item>
                </v-tabs-window>
            </DialogComponent>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { api } from '@/services/api'
    import { dateMask, numberMask, onlyNumbers } from '@/utils/masks.ts'
    import { decimal, integer, maxLength, minLength, numeric, required, textOnly } from '@/utils/validators.ts'
    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'

    interface Livro {
        cdLivro?: number
        dsLivro: string
        dsSubtitulo: string
        cdAutor: Number
        nrIsbn10: string
        nrIsbn13: string
        cdCategoria: number
        dsSinopse: string
        dsIdioma: string
        dsPaisPublicacao: string
        dtPublicacao: string
        nrPaginas: string
        cdExemplar: number
        cdEditora: number
        nrEdicao: string
        nrVolume: string
        dsObservacoes: string
        xAtivo: boolean
    }

    export default defineComponent ({
        name: 'LivrosPage',

        mounted() {
            this.reiniciar()
            document.title = this.$route.meta.title as string
        },

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
        },

        setup() {
            return {
                dateMask,
                numberMask,
                onlyNumbers,
                decimal,
                integer,
                maxLength,
                minLength,
                numeric,
                required,
                textOnly,
            }
        },

        data() {
            return {
                search: '',
                tab: 'dados-gerais',
                currentTab: 'dados-gerais',
                dialog: false,
                ativo: true,
                livros: [] as Livro[],

                formModel: {
                    dsLivro: '',
                    dsSubtitulo: '',
                    cdAutor: 0,
                    nrIsbn10: '',
                    nrIsbn13: '',
                    cdCategoria: 0,
                    dsSinopse: '',
                    dsIdioma: '',
                    dsPaisPublicacao: '',
                    dtPublicacao: '',
                    nrPaginas: '',
                    cdExemplar: 0,
                    cdEditora: 0,
                    nrEdicao: '',
                    nrVolume: '',
                    dsObservacoes: '',
                    xAtivo: false,
                } as Livro,

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' }, 
                    { title: 'Especificações', value: 'especificacoes' },
                    { title: 'Vínculos', value: 'vinculos' },
                ] as TabItem[],

                headers: [
                    { title: 'ID', key: 'cdLivro' },
                    { title: 'Título', key: 'dsLivro', align: 'start' },
                    { title: 'Dt. Publicação', key: 'dtPublicacao' },
                    { title: 'Nr. Páginas', key: 'nrPaginas' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdLivro
            },
        },

        methods: {
            novo(): Livro {
                return {
                    dsLivro: '',
                    dsSubtitulo: '',
                    cdAutor: 0,
                    nrIsbn10: '',
                    nrIsbn13: '',
                    cdCategoria: 0,
                    dsSinopse: '',
                    dsIdioma: '',
                    dsPaisPublicacao: '',
                    dtPublicacao: '',
                    nrPaginas: '',
                    cdExemplar: 0,
                    cdEditora: 0,
                    nrEdicao: '',
                    nrVolume: '',
                    dsObservacoes: '',
                    xAtivo: false,
                }
            },

            inserir(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.livros.find(livro => livro.cdLivro === id)

                if (!found) {
                    return
                }

                this.formModel = { ...found }
                this.dialog = true
            },

            deletar(id: number): void {
                const index = this.livros.findIndex(livro => livro.cdLivro === id)

                if (index !== -1) {
                    this.livros.splice(index, 1)
                }
            },

            async salvar(): Promise<void> {
                if (this.editando) {
                    return
                }

                try {
                    const request = {
                        DS_LIVRO: this.formModel.dsLivro,
                        DS_SUBTITULO: this.formModel.dsSubtitulo,
                        CD_AUTOR: this.formModel.cdAutor,
                        NR_ISBN_10: this.formModel.nrIsbn10,
                        NR_ISBN_13: this.formModel.nrIsbn13,
                        CD_CATEGORIA: this.formModel.cdCategoria,
                        DS_SINOPSE: this.formModel.dsSinopse,
                        DS_IDIOMA: this.formModel.dsIdioma,
                        DS_PAIS_PUBLICACAO: this.formModel.dsPaisPublicacao,
                        DT_PUBLICACAO: this.formModel.dtPublicacao,
                        NR_PAGINAS: this.formModel.nrPaginas,
                        CD_EXEMPLAR: this.formModel.cdExemplar,
                        CD_EDITORA: this.formModel.cdEditora,
                        NR_EDICAO: this.formModel.nrEdicao,
                        NR_VOLUME: this.formModel.nrVolume,
                        DS_OBSERVACOES: this.formModel.dsObservacoes || null,
                        X_ATIVO: this.formModel.xAtivo,
                    }

                    const response = await api.post('/livros', request)

                    this.livros.push(response.data)

                    this.dialog = false
                    this.formModel = this.novo()
                } catch (error) {
                    console.error('Erro ao cadastrar livro:', error)
                }
            },

            reiniciar(): void {
                this.dialog = false
                this.formModel = this.novo()
                this.livros = [
                    {
                        dsLivro: '',
                        dsSubtitulo: '',
                        cdAutor: 0,
                        nrIsbn10: '',
                        nrIsbn13: '',
                        cdCategoria: 0,
                        dsSinopse: '',
                        dsIdioma: '',
                        dsPaisPublicacao: '',
                        dtPublicacao: '',
                        nrPaginas: '',
                        cdExemplar: 0,
                        cdEditora: 0,
                        nrEdicao: '',
                        nrVolume: '',
                        dsObservacoes: '',
                        xAtivo: false,
                    },
                ]
            },
        },
    })
</script>

<style scoped>
    .font-spacing {
        letter-spacing: -1px;
    }

    .dialog-tabs-window {
        min-height: 400px;
    }
</style>
