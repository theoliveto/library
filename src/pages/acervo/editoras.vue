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
                    title="Excluir editora"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} uma editora`"
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
                                            v-model="formModel.dsEditora"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), textOnly(), maxLength(150)]"
                                        >
                                            <template #label>
                                                Nome <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.nrCnpj"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), cnpj()]"
                                            @update:model-value="value => formModel.nrCnpj = cnpjMask(value)"
                                        >
                                            <template #label>
                                                CNPJ <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsEmail"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), email(), maxLength(100)]"
                                            :error-messages="emailError"
                                        >
                                            <template #label>
                                                E-mail <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.nrTelefone"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            label="Telefone"
                                            :rules="[required(), phone()]"
                                            @update:model-value="value => formModel.nrTelefone = phoneFlexibleMask(value)"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsSiteOficial"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            label="Site Oficial"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.dtFundacao"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Fundação <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
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
                                            :rules="[maxLength(1000)]"
                                        />
                                    </v-col>
                                </v-row>
                            </template>
                        </v-sheet>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="endereco">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            v-model="formModel.nrCep"
                                            :loading="loadingCep"
                                            :error-messages="cepError"
                                            @blur="buscarCep"
                                            inputmode="numeric"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), cep()]"
                                            @update:model-value="value => formModel.nrCep = cepMask(value)"
                                        >
                                            <template #label>
                                                CEP <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            v-model="formModel.dsCidade"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), textOnly(), maxLength(200)]"
                                        >
                                            <template #label>
                                                Cidade <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-select
                                            v-model="formModel.dsEstado"
                                            :items="estados"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(100)]"
                                        >
                                            <template #label>
                                                Estado <span class="text-error">*</span>
                                            </template>
                                        </v-select>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsEndereco"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(200)]"
                                        >
                                            <template #label>
                                                Endereço <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsBairro"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), maxLength(100)]"
                                        >
                                            <template #label>
                                                Bairro <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.nrNumero"
                                            label="Número"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(10)]"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsComplemento"
                                            label="Complemento"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[maxLength(100)]"
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Editoras/service.ts'
    import { cep, decimal, email, phone, integer, maxLength, minLength, numeric, required, textOnly, cnpj } from '@/utils/validators.ts'
    import { cepMask, cnpjMask, dateMask, numberMask, onlyNumbers, phoneFlexibleMask, phoneMask } from '@/utils/masks.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { useSnackbar } from '@/utils/useSnackbar'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    type FormModel = Omit<ModelDto, 'dtFundacao'> & { dtFundacao: Date | null }

    export default defineComponent ({
        name: 'EditorasPage',

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            MessageComponent,
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
                loadingCep: false,

                cepError: '',
                cnpjError: '',
                emailError: '',

                search: '',

                registros: [] as ModelDto[],

                formModel: {
                    dsEditora: '',
                    nrCnpj: '',
                    nrCep: '',
                    dsCidade: '',
                    dsEstado: '',
                    dsEndereco: '',
                    dsBairro: '',
                    nrNumero: '',
                    dsComplemento: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dsSiteOficial: '',
                    dtFundacao: null,
                    dsObservacoes: '',
                    xAtivo: true,
                } as FormModel,

                estados: [
                    'Acre (AC)',
                    'Alagoas (AL)',
                    'Amapá (AP)',
                    'Amazonas (AM)',
                    'Bahia (BA)',
                    'Ceará (CE)',
                    'Distrito Federal (DF)',
                    'Espírito Santo (ES)',
                    'Goiás (GO)',
                    'Maranhão (MA)',
                    'Mato Grosso (MT)',
                    'Mato Grosso do Sul (MS)',
                    'Minas Gerais (MG)',
                    'Pará (PA)',
                    'Paraíba (PB)',
                    'Paraná (PR)',
                    'Pernambuco (PE)',
                    'Piauí (PI)',
                    'Rio de Janeiro (RJ)',
                    'Rio Grande do Norte (RN)',
                    'Rio Grande do Sul (RS)',
                    'Rondônia (RO)',
                    'Roraima (RR)',
                    'Santa Catarina (SC)',
                    'São Paulo (SP)',
                    'Sergipe (SE)',
                    'Tocantins (TO)',
                ],

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdEditora' },
                    { title: 'Nome', key: 'dsEditora', align: 'start' },
                    { title: 'CNPJ', key: 'nrCnpj' },
                    { title: 'Fundação', key: 'dtFundacao' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                ativo: false,

                visible: false,

                currentTab: 'dados-gerais',

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                    { title: 'Endereço', value: 'endereco' },
                ] as TabItem[],

                messageDialog: false,
                excluirRegistro: null as number | null,
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdEditora
            },

            tableMeta() {
                return (this.$route.meta.table as any) || {}
            },

            registrosFormatados (): ModelDto[] {
                return this.registros.map(registro => ({
                    ...registro,
                    dtFundacao: paraDataBR(registro.dtFundacao),
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
                    cdEditora: 0,
                    dsEditora: '',
                    nrCnpj: '',
                    nrCep: '',
                    dsCidade: '',
                    dsEstado: '',
                    dsEndereco: '',
                    dsBairro: '',
                    nrNumero: '',
                    dsComplemento: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dsSiteOficial: '',
                    dtFundacao: null,
                    dsObservacoes: '',
                    xAtivo: true,
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.registros.find(r => r.cdEditora === id)
                if (!found) return
                this.formModel = { ...found, dtFundacao: paraDate(found.dtFundacao), }
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
                    dsEditora: this.formModel.dsEditora,
                    nrCnpj: this.formModel.nrCnpj,
                    nrCep: this.formModel.nrCep,
                    dsCidade: this.formModel.dsCidade,
                    dsEstado: this.formModel.dsEstado,
                    dsEndereco: this.formModel.dsEndereco,
                    dsBairro: this.formModel.dsBairro,
                    nrNumero: this.formModel.nrNumero,
                    dsComplemento: this.formModel.dsComplemento || null,
                    dsEmail: this.formModel.dsEmail,
                    nrTelefone: this.formModel.nrTelefone,
                    dsSiteOficial: this.formModel.dsSiteOficial,
                    dtFundacao: paraIso(this.formModel.dtFundacao as Date),
                    dsObservacoes: this.formModel.dsObservacoes || null,
                    xAtivo: this.formModel.xAtivo,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await modelService.atualizar(this.formModel.cdEditora, payload)
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

            formatarCep (valor: string) {
                let cepLimpo = valor.replace(/\D/g, '')

                cepLimpo = cepLimpo.slice(0, 8)

                if (cepLimpo.length > 5) {
                    cepLimpo = cepLimpo.replace(/^(\d{5})(\d)/, '$1-$2')
                }

                this.formModel.nrCep = cepLimpo
            },

            buscarEstadoPorUf (uf: string) {
                return this.estados.find(estado => estado.endsWith(`(${uf})`))
            },

            async buscarCep () {
                const cepLimpo = this.formModel.nrCep.replace(/\D/g, '')

                if (cepLimpo.length !== 8) {
                    return
                }

                this.cepError = ''
                this.loadingCep = true

                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                    const data = await response.json()

                    if (data.erro) {
                        this.cepError = 'CEP não encontrado'
                        this.limparEndereco()
                        return
                    }

                    this.formModel.dsEndereco = data.logradouro
                    this.formModel.dsBairro = data.bairro
                    this.formModel.dsCidade = data.localidade
                    this.formModel.dsEstado = this.buscarEstadoPorUf(data.uf) || ''
                    this.formModel.dsComplemento = data.complemento
                } catch (error) {
                    this.cepError = 'Erro ao consultar CEP'
                    console.error(error)
                } finally {
                    this.loadingCep = false
                }
            },

            limparEndereco () {
                this.formModel.dsEndereco = ''
                this.formModel.dsBairro = ''
                this.formModel.dsCidade = ''
                this.formModel.dsEstado = ''
                this.formModel.dsComplemento = ''
            },
        },
    })
</script>
