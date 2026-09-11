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
                    title="Excluir empréstimo"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} um empréstimo`"
                :subtitle="`${editando ? 'Atualizar' : 'Cadastrar'} registro`"
                @save="salvar"
            >
                <v-tabs-window v-model="currentTab" class="dialog-tabs-window">
                    <v-tabs-window-item value="dados-gerais">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="6">
                                        <SelectorField
                                            v-model="formModel.pessoaId"
                                            label="Pessoa"
                                            title="Selecione uma Pessoa"
                                            :items="pessoas"
                                            item-value="pessoaId"
                                            item-title="pessoa"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { pessoa: string | null }) => formModel.pessoa = item.pessoa"
                                            @clear="formModel.pessoa = ''"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <SelectorField
                                            v-model="formModel.exemplarId"
                                            label="Exemplar"
                                            title="Selecione um Exemplar"
                                            :items="exemplares"
                                            item-value="exemplarId"
                                            item-title="exemplar"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { exemplar: string | null }) => formModel.exemplar = item.exemplar"
                                            @clear="formModel.exemplar = ''"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.emprestimo"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Empréstimo <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.previsaoDevolucao"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Previsão de Devolução <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.devolucao"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Devolução <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-select
                                        class="mt-n2"
                                        v-model="formModel.status"
                                        :items="status"
                                        variant="outlined"
                                        persistent-placeholder
                                        clearable
                                        :rules="[required(), textOnly(), maxLength(50)]"
                                    >
                                        <template #label>
                                            Status <span class="text-error">*</span>
                                        </template>
                                    </v-select>
                                    
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
                                            :rules="[maxLength(1000)]"
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Emprestimos/service.ts'
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

    type FormModel = Omit<ModelDto, 'emprestimo' | 'previsaoDevolucao' | 'devolucao' > & { 
        emprestimo: Date | null 
        previsaoDevolucao: Date | null 
        devolucao: Date | null 
    }

    export default defineComponent ({
        name: 'EmprestimosPage',

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
                ativo: true,
                visible: false,
                dialog: false,
                messageDialog: false,
                excluirRegistro: null as number | null,

                registros: [] as ModelDto[],
                pessoas: [] as { pessoaId: number; pessoa: string }[],
                exemplares: [] as { exemplarId: number; exemplar: string }[],

                formModel: {
                    pessoaId: null,
                    pessoa: '',
                    exemplarId: null,
                    exemplar: '',
                    emprestimo: null,
                    previsaoDevolucao: null,
                    devolucao: null,
                    status: '',
                    observacoes: '',
                    ativo: true,
                } as FormModel,
                
                status: [
                    'Pendente',
                    'Devolvido',
                    'Vencido',
                    'Renovado',
                    'Perdido',
                    'Cancelado',
                ],

                headers: [
                    { title: 'ID', key: 'id' },
                    { title: 'Pessoa', key: 'pessoa', align: 'start' },
                    { title: 'Exemplar', key: 'exemplar', align: 'start' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                    { title: 'Endereço', value: 'endereco' },
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
                    emprestimo: paraDataBR(registro.emprestimo),
                    previsaoDevolucao: paraDataBR(registro.previsaoDevolucao),
                    devolucao: paraDataBR(registro.devolucao),
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
                    pessoaId: null,
                    pessoa: '',
                    exemplarId: null,
                    exemplar: '',
                    emprestimo: null,
                    previsaoDevolucao: null,
                    devolucao: null,
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
                    emprestimo: paraDate(found.emprestimo), 
                    previsaoDevolucao: paraDate(found.previsaoDevolucao),
                    devolucao: paraDate(found.devolucao),
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
                    pessoaId: this.formModel.pessoaId,
                    pessoa: this.formModel.pessoa || null,
                    exemplarId: this.formModel.exemplarId,
                    exemplar: this.formModel.exemplar || null,
                    emprestimo: paraIso(this.formModel.emprestimo as Date),
                    previsaoDevolucao: paraIso(this.formModel.previsaoDevolucao as Date),
                    devolucao: paraIso(this.formModel.devolucao as Date),
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
