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
                    title="Excluir exemplar"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} um exemplar`"
                :subtitle="`${editando ? 'Atualizar' : 'Cadastrar'} registro`"
                @save="salvar"
            >
                <v-tabs-window v-model="currentTab" class="dialog-tabs-window">
                    <v-tabs-window-item value="dados-gerais">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="6">
                                        <SelectorField
                                            v-model="formModel.livroId"
                                            label="Livro"
                                            title="Selecione um Livro"
                                            :items="livros"
                                            item-value="livroId"
                                            item-title="livro"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { livro: string | null }) => formModel.livro = item.livro"
                                            @clear="formModel.livro = ''"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.patrimonio"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(150)]"
                                        >
                                            <template #label>
                                                Patrimônio <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.localizacao"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(150)]"
                                            label="Localização"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="formModel.ean"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(20)]"
                                        >
                                            <template #label>
                                                EAN <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.aquisicao"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            label="Dt. Aquisição"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.valorAquisicao"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            label="Vl. Aquisição"
                                            :rules="[maxLength(20)]"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.status"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(50)]"
                                        >
                                            <template #label>
                                                Status <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
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
                </v-tabs-window>
            </DialogComponent>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Exemplares/service.ts'
    import { cep, decimal, email, phone, integer, maxLength, minLength, numeric, required, textOnly, cnpj } from '@/utils/validators.ts'
    import { cepMask, cnpjMask, dateMask, numberMask, onlyNumbers, phoneFlexibleMask, phoneMask } from '@/utils/masks.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { useSnackbar } from '@/utils/useSnackbar'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'
    import SelectorFieldComponent from '@/components/Forms/SelectorFieldComponent.vue'

    type FormModel = Omit<ModelDto, 'aquisicao'> & { aquisicao: Date | null }

    export default defineComponent ({
        name: 'ExemplaresPage',

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            MessageComponent,
            SelectorFieldComponent,
        },

        setup() {
            const { success, error, warning, info } = useSnackbar()

            return {
                cep,
                cnpj,
                email,
                phone,
                decimal,
                integer,
                maxLength,
                minLength,
                numeric,
                required,
                cnpjMask,
                cepMask,
                phoneFlexibleMask,
                textOnly,
                success,
                error,
                warning,
                info,
            }
        },

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
                livros: [] as { livroId: number; livro: string }[],

                formModel: {
                    id: 0,
                    livroId: null,
                    livro: '',
                    patrimonio: '',
                    localizacao: '',
                    ean: '',
                    aquisicao: null,
                    valorAquisicao: 0,
                    status: '',
                    observacoes: '',
                    ativo: true,
                } as FormModel,

                headers: [
                    { title: 'ID', key: 'cdExemplar' },
                    { title: 'Livro', key: 'cdLivro', align: 'start' },
                    { title: 'Patrimônio', key: 'nrPatrimonio' },
                    { title: 'Status', key: 'dsStatus' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                ] as TabItem[],
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
                    aquisicao: paraDataBR(registro.aquisicao),
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
                    livroId: null,
                    livro: '',
                    patrimonio: '',
                    localizacao: '',
                    ean: '',
                    aquisicao: null,
                    valorAquisicao: 0,
                    status: '',
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
                    aquisicao: paraDate(found.aquisicao)
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
                    livroId: this.formModel.livroId,
                    livro: this.formModel.livro || null,
                    patrimonio: this.formModel.patrimonio,
                    localizacao: this.formModel.localizacao,
                    ean: this.formModel.ean,
                    aquisicao: paraIso(this.formModel.aquisicao as Date),
                    valorAquisicao: this.formModel.valorAquisicao,
                    status: this.formModel.status,
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