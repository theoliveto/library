<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-5">
                <TableComponent
                    :title="tableMeta.title"
                    :icon="tableMeta.icon"
                    :item-key="tableMeta.itemKey"
                    :headers="headers"
                    :items="registros"
                    @add="adicionar"
                    @edit="editar"
                    @delete="deletar"
                    @reset="reiniciar"
                />

                <MessageComponent 
                    v-model="messageDialog"
                    title="Excluir livro"
                    icon-title="mdi-help-box-multiple-outline"
                    message="Tem certeza que deseja excluir este registro? Essa ação não poderá ser desfeita."
                    confirm-text="Excluir"
                    confirm-color="error"
                    cancel-text="Cancelar"
                    cancel-color="grey"
                    @confirm="confirmarExclusao"
                    @cancel="cancelarExclusao"
                />
            </v-container>

            <DialogComponent
                v-model="dialog"
                v-model:active-switch="formModel.ativo"
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
                                            v-model="formModel.descricao"
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
                                            v-model="formModel.subtitulo"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(150)]"
                                            label="Sub-Título"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.isbn"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(10)]"
                                        >
                                            <template #label>
                                                ISBN <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12">
                                        <v-textarea
                                            class="mt-n2"
                                            v-model="formModel.sinopse"
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
                                            v-model="formModel.observacoes"
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
                                            v-model="formModel.idioma"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.publicacao"
                                            prepend-icon=""
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required()]"
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
                                            v-model="formModel.paginas"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            label="Edição"
                                            v-model="formModel.edicao"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <SelectorField
                                            v-model="formModel.autorId"
                                            label="Autor"
                                            title="Selecione um Autor"
                                            :items="autores"
                                            item-value="autorId"
                                            item-title="autor"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { autor: string | null }) => formModel.autor = item.autor"
                                            @clear="formModel.autor = ''"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <SelectorField
                                            v-model="formModel.editoraId"
                                            label="Editora"
                                            title="Selecione uma Editora"
                                            :items="editoras"
                                            item-value="editoraId"
                                            item-title="editora"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { editora: string | null }) => formModel.editora = item.editora"
                                            @clear="formModel.editora = ''"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <SelectorField
                                            v-model="formModel.categoriaId"
                                            label="Categoria"
                                            title="Selecione uma Categoria"
                                            :items="categorias"
                                            item-value="categoriaId"
                                            item-title="categoria"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { categoria: string | null }) => formModel.categoria = item.categoria"
                                            @clear="formModel.categoria = ''"
                                        />
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Livros/service.ts'
    import { numberMask, onlyNumbers } from '@/utils/masks.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { decimal, integer, maxLength, minLength, numeric, required, textOnly } from '@/utils/validators.ts'
    import { useSnackbar } from '@/utils/useSnackbar'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import SelectorComponent from '@/components/SelectorComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    type FormModel = Omit<ModelDto, 'publicacao'> & { publicacao: Date | null  }

    export default defineComponent ({
        name: 'LivrosPage',

        data() {
            return {
                search: '',
                currentTab: 'dados-gerais',
                dialog: false,
                ativo: true,
                visible: false,
                messageDialog: false,
                excluirRegistro: null as number | null,
                
                registros: [] as ModelDto[],
                autores: [] as { autorId: number; autor: string }[],
                editoras: [] as { editoraId: number; editora: string }[],
                categorias: [] as { categoriaId: number; categoria: string }[],

                formModel: {
                    id: 0,
                    descricao: '',
                    subtitulo: '',
                    autorId: null,
                    autor: '',
                    editoraId: null,
                    editora: '',
                    categoriaId: null,
                    categoria: '',
                    isbn: '',
                    idioma: '',
                    edicao: '',
                    paginas: '',
                    publicacao: null,
                    sinopse: '',
                    imagemCapa: '',
                    observacoes: '',
                    ativo: true,
                } as FormModel,

                headers: [
                    { title: 'ID', key: 'id' },
                    { title: 'Descrição', key: 'descricao', align: 'start' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                    { title: 'Especificações', value: 'especificacoes' },
                ] as TabItem[],
            }
        },

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            SelectorComponent,
            MessageComponent,
        },

        setup() {
            const { success, error, warning, info } = useSnackbar()

            return {
                numberMask, 
                onlyNumbers,
                decimal, 
                integer,
                maxLength,
                minLength, 
                numeric,
                required,
                textOnly,
                success,
                error,
                warning,
                info,
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.id
            },

            tableMeta() {
                return (this.$route.meta.table as any) || {}
            },

            registrosFormatados (): ModelDto[] {
                return this.registros.map(registro => ({
                    ...registro,
                    publicacao: paraDataBR(registro.publicacao),
                }))
            },
        },

        async mounted() {
            document.title = this.$route.meta.title as string
            await this.carregarRegistros()
        },

        methods: {
            async carregarRegistros (): Promise<void> {
                try {
                    this.registros = await modelService.obterTodos()
                } catch (error) {
                    console.error('Erro ao carregar registros:', error)
                    this.error('Erro ao carregar registros.')
                }
            },

            novo(): FormModel  {
                return {
                    id: 0,
                    descricao: '',
                    subtitulo: '',
                    autorId: null,
                    autor: '',
                    editoraId: null,
                    editora: '',
                    categoriaId: null,
                    categoria: '',
                    isbn: '',
                    idioma: '',
                    edicao: '',
                    paginas: '',
                    publicacao: null,
                    sinopse: '',
                    imagemCapa: '',
                    observacoes: '',
                    ativo: true,
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.registros.find(r => r.id === id)
                if (!found) return
                this.formModel = { 
                    ...found, 
                    publicacao: paraDate(found.publicacao), 
                }
                this.dialog = true
            },

            deletar(id: number): void {
                this.excluirRegistro = id
                this.messageDialog = true
            },

            async confirmarExclusao(): Promise<void> {
                if (this.excluirRegistro === null) return

                try {
                    await modelService.excluir(this.excluirRegistro)
                    await this.carregarRegistros()
                    this.success('Registro excluído com sucesso.')
                } catch (error) {
                    console.error('Erro ao excluir registro:', error)
                    this.error('Erro ao excluir registro.')
                } finally {
                    this.excluirRegistro = null
                }
            },

            cancelarExclusao(): void {
                this.excluirRegistro = null
            },

            montarPayload(): ModelCreateDto {
                return {
                    descricao: this.formModel.descricao,
                    subtitulo: this.formModel.subtitulo,
                    autorId: this.formModel.autorId,
                    autor: this.formModel.autor,
                    editoraId: this.formModel.editoraId,
                    editora: this.formModel.editora,
                    isbn: this.formModel.isbn,
                    idioma: this.formModel.idioma,
                    edicao: this.formModel.edicao,
                    paginas: this.formModel.paginas,
                    publicacao: paraIso(this.formModel.publicacao as Date),
                    categoriaId: this.formModel.categoriaId,
                    categoria: this.formModel.categoria,
                    sinopse: this.formModel.sinopse || null,
                    imagemCapa: this.formModel.imagemCapa || null,
                    observacoes: this.formModel.observacoes || null,
                    ativo: this.formModel.ativo,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await modelService.atualizar(this.formModel.id, payload)
                        this.success('Registro atualizado com sucesso.')
                    } else {
                        await modelService.criar(payload)
                        this.success('Registro salvo com sucesso.')
                    }

                    this.dialog = false
                    this.formModel = this.novo()
                    await this.carregarRegistros()
                } catch (error) {
                    console.error('Erro ao salvar registro:', error)
                    this.error('Erro ao salvar registro.')
                }
            },

            reiniciar(): void {
                this.dialog = false
                this.formModel = this.novo()
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
