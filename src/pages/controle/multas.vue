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
                    title="Excluir multa"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} uma multa`"
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
                                            v-model="formModel.emprestimoId"
                                            label="Empréstimo"
                                            title="Selecione um Empréstimo"
                                            :items="emprestimos"
                                            item-value="emprestimoId"
                                            item-title="emprestimo"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { emprestimo: string | null }) => formModel.emprestimo = item.emprestimo"
                                            @clear="formModel.emprestimo = ''"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.motivo"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(100)]"
                                        >
                                            <template #label>
                                                Motivo <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.valor"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(100)]"
                                        >
                                            <template #label>
                                                Valor <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.data"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Multa <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.pagamento"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Pagamento <span class="text-error">*</span>
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Multas/service.ts'
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

    type FormModel = Omit<ModelDto, 'data' | 'pagamento' > & { 
        data: Date | null 
        pagamento: Date | null
    }

    export default defineComponent ({
        name: 'MultasPage',

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
                emprestimos: [] as { emprestimoId: number; emprestimo: string }[],

                formModel: {
                    id: 0,
                    pessoaId: null,
                    pessoa: '',
                    emprestimoId: null,
                    emprestimo: '',
                    motivo: '',
                    valor: 0,
                    data: null,
                    pagamento: null,
                    status: '',
                    observacoes: '',
                    ativo: true,
                } as FormModel,
                
                status: [
                    'Pendente',
                    'Paga',
                    'Cancelada',
                ],

                headers: [
                    { title: 'ID', key: 'id' },
                    { title: 'Pessoa', key: 'pessoa', align: 'start' },
                    { title: 'Empréstimo', key: 'emprestimo', align: 'start' },
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
                    data: paraDataBR(registro.data),
                    pagamento: paraDataBR(registro.pagamento),
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
                    emprestimoId: null,
                    emprestimo: '',
                    motivo: '',
                    valor: 0,
                    data: null,
                    pagamento: null,
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
                    data: paraDate(found.data), 
                    pagamento: paraDate(found.pagamento),
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
                    emprestimoId: this.formModel.emprestimoId,
                    emprestimo: this.formModel.emprestimo || null,
                    motivo: this.formModel.motivo,
                    valor: this.formModel.valor,
                    data: paraIso(this.formModel.data as Date),
                    pagamento: paraIso(this.formModel.pagamento as Date),
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
