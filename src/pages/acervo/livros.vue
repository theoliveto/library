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
                    title="Excluir categoria"
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
                                            :rules="[maxLength(150)]"
                                            label="Sub-Título"
                                        />
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
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.dtPublicacao"
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
                                            v-model="formModel.cdAutor"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            persistent-placeholder
                                            readonly
                                            clearable
                                            :rules="[required()]"
                                            @click="dialogAutor = true"
                                            @click:clear="limparAutor"
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
                                            readonly
                                            clearable
                                            :rules="[required()]"
                                            @click="dialogCategoria = true"
                                            @click:clear="limparCategoria"
                                        >
                                            <template #label>
                                                Categoria <span class="text-error">*</span>
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
                                            readonly
                                            clearable
                                            :rules="[required()]"
                                            @click="dialogEditora = true"
                                            @click:clear="limparEditora"
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

        <SelectorComponent
            v-model="dialogCategoria"
            title="Selecione uma Categoria"
            :items="categorias"
            item-value="cdCategoria"
            item-title="dsCategoria"
            @select="selecionarCategoria"
        />

        <SelectorComponent
            v-model="dialogEditora"
            title="Selecione uma Editora"
            :items="editoras"
            item-value="cdEditora"
            item-title="dsEditora"
            @select="selecionarEditora"
        />

        <SelectorComponent
            v-model="dialogAutor"
            title="Selecione um Autor"
            :items="autores"
            item-value="cdAutor"
            item-title="dsAutor"
            @select="selecionarAutor"
        />

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

    type FormModel = Omit<ModelDto, 'dtPublicacao'> & { dtPublicacao: Date | null  }

    export default defineComponent ({
        name: 'LivrosPage',

        data() {
            return {
                search: '',

                registros: [] as ModelDto[],

                formModel: {
                    dsLivro: '',
                    dsSubtitulo: '',
                    cdAutor: null,
                    cdEditora: null,
                    nrIsbn10: '',
                    nrIsbn13: '',
                    dsIdioma: '',
                    nrEdicao: '',
                    nrPaginas: '',
                    dtPublicacao: null,
                    cdCategoria: null,
                    dsSinopse: '',
                    imLivro: '',
                    dsObservacoes: '',
                    xAtivo: true,
                } as FormModel,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdLivro' },
                    { title: 'Nome', key: 'dsLivro', align: 'start' },
                    { title: 'Edição', key: 'nrEdicao', align: 'start' },
                    { title: 'Páginas', key: 'nrPaginas', align: 'start' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                ativo: false,

                visible: false,

                currentTab: 'dados-gerais',

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                    { title: 'Especificações', value: 'especificacoes' },
                ] as TabItem[],

                messageDialog: false,
                excluirRegistro: null as number | null,

                dialogCategoria: false,
                categorias: [] as { cdCategoria: number; dsCategoria: string }[],

                dialogAutor: false,
                autores: [] as { cdAutor: number; dsAutor: string }[],

                dialogEditora: false,
                editoras: [] as { cdEditora: number; dsEditora: string }[],
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
                return !!this.formModel.cdLivro
            },

            tableMeta() {
                return (this.$route.meta.table as any) || {}
            },

            registrosFormatados (): ModelDto[] {
                return this.registros.map(registro => ({
                    ...registro,
                    dtPublicacao: paraDataBR(registro.dtPublicacao),
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
                    cdLivro: 0,
                    dsLivro: '',
                    dsSubtitulo: '',
                    cdAutor: null,
                    dsAutor: '',
                    cdEditora: null,
                    dsEditora: '',
                    nrIsbn10: '',
                    nrIsbn13: '',
                    dsIdioma: '',
                    nrEdicao: '',
                    nrPaginas: '',
                    dtPublicacao: null,
                    cdCategoria: null,
                    dsCategoria: '',
                    dsSinopse: '',
                    imLivro: '',
                    dsObservacoes: '',
                    xAtivo: true,
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.registros.find(r => r.cdLivro === id)
                if (!found) return
                this.formModel = { 
                    ...found, 
                    dtPublicacao: paraDate(found.dtPublicacao), 
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
                    dsLivro: this.formModel.dsLivro,
                    dsSubtitulo: this.formModel.dsSubtitulo,
                    cdAutor: this.formModel.cdAutor,
                    dsAutor: this.formModel.dsAutor,
                    cdEditora: this.formModel.cdEditora,
                    dsEditora: this.formModel.dsEditora,
                    nrIsbn10: this.formModel.nrIsbn10,
                    nrIsbn13: this.formModel.nrIsbn13,
                    dsIdioma: this.formModel.dsIdioma,
                    nrEdicao: this.formModel.nrEdicao,
                    nrPaginas: this.formModel.nrPaginas,
                    dtPublicacao: paraIso(this.formModel.dtPublicacao as Date),
                    cdCategoria: this.formModel.cdCategoria,
                    dsCategoria: this.formModel.dsCategoria,
                    dsSinopse: this.formModel.dsSinopse,
                    imLivro: this.formModel.imLivro || null,
                    dsObservacoes: this.formModel.dsObservacoes || null,
                    xAtivo: this.formModel.xAtivo,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await modelService.atualizar(this.formModel.cdLivro, payload)
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

            selecionarCategoria(item: { cdCategoria: number; dsCategoria: string }) {
                this.formModel.cdCategoria = item.cdCategoria;
                this.formModel.dsCategoria = item.dsCategoria;
            },

            limparCategoria() {
                this.formModel.cdCategoria = 0;
                this.formModel.dsCategoria = '';
            },

            selecionarAutor(item: { cdAutor: number; dsAutor: string }) {
                this.formModel.cdAutor = item.cdAutor;
                this.formModel.dsAutor = item.dsAutor;
            },

            limparAutor() {
                this.formModel.cdAutor = 0;
                this.formModel.dsAutor = '';
            },

            selecionarEditora(item: { cdEditora: number; dsEditora: string }) {
                this.formModel.cdEditora = item.cdEditora;
                this.formModel.dsEditora = item.dsEditora;
            },

            limparEditora() {
                this.formModel.cdEditora = 0;
                this.formModel.dsEditora = '';
            }
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
