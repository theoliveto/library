<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-5">
                <TableComponent
                    title="Pessoas"
                    icon="mdi-account-group-outline"
                    item-key="cdPessoa"
                    :headers="headers"
                    :items="pessoasFormatadas"
                    @add="adicionar"
                    @edit="editar"
                    @delete="deletar"
                    @reset="reiniciar"
                />

                <MessageComponent 
                    v-model="messageDialog"
                    title="Excluir pessoa"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} uma pessoa`"
                :subtitle="`${editando ? 'Atualizar' : 'Cadastrar'} registro`"
                @save="salvar"
            >
                <v-tabs-window v-model="currentTab" class="dialog-tabs-window">
                    <v-tabs-window-item value="dados-pessoais">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.dsPessoa"
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
                                            v-model="formModel.nrCpf"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), cpf()]"
                                            @update:model-value="value => formModel.nrCpf = cpfMask(value)"
                                        >
                                            <template #label>
                                                CPF <span class="text-error">*</span>
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
                                            :rules="[required(), phone()]"
                                            @update:model-value="value => formModel.nrTelefone = phoneFlexibleMask(value)"
                                        >
                                            <template #label>
                                                Telefone <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.dtNascimento"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            :rules="[required()]"
                                        >
                                            <template #label>
                                                Dt. Nascimento <span class="text-error">*</span>
                                            </template>
                                        </v-date-input>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-select
                                            class="mt-n2"
                                            v-model="formModel.dsGenero"
                                            :items="['Masculino', 'Feminino']"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), textOnly()]"
                                        >
                                            <template #label>
                                                Gênero <span class="text-error">*</span>
                                            </template>
                                        </v-select>
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
    import { pessoaService, type PessoaDto, type PessoaCreateDto } from '../../services/Pessoas/service.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { cepMask, cpfMask, dateMask, numberMask, onlyNumbers, phoneFlexibleMask, phoneMask } from '@/utils/masks.ts'
    import { cep, cpf, decimal, email, integer, maxLength, minLength, numeric, phone, required, textOnly } from '@/utils/validators.ts'

    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    type PessoaFormModel = Omit<PessoaDto, 'dtNascimento'> & { dtNascimento: Date | null }

    export default defineComponent({
        name: 'PessoasPage',

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            MessageComponent
        },

        setup () {
            return {
                cepMask,
                cpfMask,
                dateMask,
                numberMask,
                onlyNumbers,
                phoneFlexibleMask,
                phoneMask,
                paraDataBR,
                cep,
                cpf,
                decimal,
                email,
                integer,
                maxLength,
                minLength,
                numeric,
                phone,
                required,
                textOnly,
            }
        },

        data () {
            return {
                loadingCep: false,

                cepError: '',

                search: '',

                tab: 'one',

                currentYear: new Date().getFullYear(),

                pessoas: [] as PessoaDto[],

                formModel: {
                    dsPessoa: '',
                    nrCpf: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dtNascimento: null,
                    dsGenero: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    nrCep: '',
                    dsCidade: '',
                    dsEstado: '',
                    dsEndereco: '',
                    dsBairro: '',
                    nrNumero: '',
                    dsComplemento: '',
                } as PessoaFormModel,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdPessoa' },
                    { title: 'Nome', key: 'dsPessoa', align: 'start' },
                    { title: 'E-mail', key: 'dsEmail' },
                    { title: 'CPF', key: 'nrCpf' },
                    { title: 'Gênero', key: 'dsGenero', align: 'end' },
                    { title: 'Nascimento', key: 'dtNascimento', align: 'end' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

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

                ativo: false,

                currentTab: 'one',

                tabsConfig: [
                    { title: 'Dados Pessoais', value: 'dados-pessoais' },
                    { title: 'Endereço', value: 'endereco' },
                ] as TabItem[],

                messageDialog: false,
                excluirPessoa: null as number | null,
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdPessoa
            },

            pessoasFormatadas (): PessoaDto[] {
                return this.pessoas.map(pessoa => ({
                    ...pessoa,
                    dtNascimento: paraDataBR(pessoa.dtNascimento),
                }))
            },
        },

        async mounted () {
            document.title = this.$route.meta.title as string
            await this.carregarPessoas()
        },

        methods: {
            async carregarPessoas (): Promise<void> {
                try {
                    this.pessoas = await pessoaService.obterTodos()
                } catch (error) {
                    console.error('Erro ao carregar pessoas:', error)
                }
            },

            novo(): PessoaFormModel {
                return {
                    cdPessoa: 0,
                    dsPessoa: '',
                    nrCpf: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dtNascimento: null,
                    dsGenero: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    nrCep: '',
                    dsCidade: '',
                    dsEstado: '',
                    dsEndereco: '',
                    dsBairro: '',
                    nrNumero: '',
                    dsComplemento: '',
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.pessoas.find(pessoa => pessoa.cdPessoa === id)
                if (!found) return
                this.formModel = { ...found, dtNascimento: paraDate(found.dtNascimento) }
                this.dialog = true
            },

            deletar(id: number): void {
                this.excluirPessoa = id
                this.messageDialog = true
            },

            async confirmarExclusao(): Promise<void> {
                if (this.excluirPessoa === null) return

                try {
                    await pessoaService.excluir(this.excluirPessoa)
                    await this.carregarPessoas()
                } catch (error) {
                    console.error('Erro ao excluir pessoa:', error)
                } finally {
                    this.excluirPessoa = null
                }
            },

            cancelarExclusao(): void {
                this.excluirPessoa = null
            },

            montarPayload (): PessoaCreateDto {
                return {
                    dsPessoa: this.formModel.dsPessoa,
                    nrCpf: this.formModel.nrCpf,
                    dsEmail: this.formModel.dsEmail,
                    nrTelefone: this.formModel.nrTelefone,
                    dtNascimento: paraIso(this.formModel.dtNascimento as Date),
                    dsGenero: this.formModel.dsGenero,
                    dsObservacoes: this.formModel.dsObservacoes || null,
                    xAtivo: this.formModel.xAtivo,
                    nrCep: this.formModel.nrCep,
                    dsCidade: this.formModel.dsCidade,
                    dsEstado: this.formModel.dsEstado,
                    dsEndereco: this.formModel.dsEndereco,
                    dsBairro: this.formModel.dsBairro,
                    nrNumero: this.formModel.nrNumero || null,
                    dsComplemento: this.formModel.dsComplemento || null,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await pessoaService.atualizar(this.formModel.cdPessoa, payload)
                    } else {
                        await pessoaService.criar(payload)
                    }

                    this.dialog = false
                    this.formModel = this.novo()
                    await this.carregarPessoas()
                } catch (error) {
                    console.error('Erro ao salvar pessoa:', error)
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

<style scoped>
    .font-spacing {
        letter-spacing: -1px;
    }

    .dialog-tabs-window {
        min-height: 400px;
    }
</style>
