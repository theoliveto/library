<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-n5">
                <v-breadcrumbs :items="items">
                    <template #divider>
                        <v-icon icon="mdi-chevron-right" />
                    </template>
                </v-breadcrumbs>

                <v-sheet border rounded class="mt-n3">
                    <v-data-table :headers="headers" :items="pessoas" :search="search">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-icon color="medium-emphasis" icon="mdi-account-group-outline" size="default" start />
                                    <span class="font-spacing">Pessoas</span>
                                </v-toolbar-title>

                                <v-spacer />

                                <v-text-field
                                    label="Pesquisar"
                                    v-model="search"
                                    density="compact"
                                    variant="outlined"
                                    persistent-placeholder
                                    hide-details
                                    clearable
                                    class="me-4"
                                    max-width="300"
                                />

                                <v-btn class="me-2 pa-5 bg-light-blue-darken-3" color="white" prepend-icon="mdi-plus" text="Novo" border @click="add" />
                            </v-toolbar>
                        </template>

                        <template #item.actions="{ item }">
                            <div class="d-flex ga-2 justify-end">
                                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="item.cdPessoa !== undefined && edit(item.cdPessoa)" />
                                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="item.cdPessoa !== undefined && remove(item.cdPessoa)" />
                            </div>
                        </template>

                        <template #no-data>
                            <v-btn
                                prepend-icon="mdi-backup-restore"
                                rounded="lg"
                                text="Recarregar"
                                variant="text"
                                border
                                @click="reset"
                            />
                        </template>
                    </v-data-table>
                </v-sheet>
            </v-container>

            <v-dialog v-model="dialog" max-width="1000">
                <v-card>
                    <v-card-title class="d-flex align-center bg-blue-lighten-4 pa-5">
                        <div class="font-spacing">
                            <div class="text-headline-small font-weight-medium">{{ `${editando ? 'Editando' : 'Inserindo'} uma pessoa` }}</div>
                            <div class="text-title-medium font-weight-light">{{ `${editando ? 'Atualizar' : 'Cadastrar'} registro` }}</div>
                        </div>

                        <v-spacer />

                        <v-switch
                            label="Ativo"
                            v-model="formModel.xAtivo"
                            color="primary"
                            hide-details
                        />
                    </v-card-title>

                    <v-tabs v-model="tab" color="primary">
                        <v-tab value="one">Dados Pessoais</v-tab>
                        <v-tab value="two">Endereço</v-tab>
                    </v-tabs>

                    <v-divider />

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
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
                                                persistent-placeholder
                                                clearable
                                                :rules="[required()]"
                                                @update:model-value="value => formModel.dtNascimento = dateMask(value)"
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
                                                auto-grow
                                                :rules="[maxLength(500)]"
                                            />
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-sheet>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="two">
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
                                                :rules="[required(), textOnly(), maxLength(100)]"
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

                    <v-divider />

                    <v-card-actions class="bg-surface-light">
                        <v-btn color="red-lighten-1" text="Cancelar" variant="plain" @click="dialog = false" />

                        <v-spacer />

                        <v-btn color="green-darken-1" text="Salvar" @click="save" />
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { cepMask, cpfMask, dateMask, numberMask, onlyNumbers, phoneFlexibleMask, phoneMask } from '@/utils/masks.ts'
    import { cep, cpf, decimal, email, integer, maxLength, minLength, numeric, phone, required, textOnly } from '@/utils/validators.ts'

    import HeaderComponent from '@/components/HeaderComponent.vue'

    interface Pessoa {
        cdPessoa?: number
        dsPessoa: string
        nrCpf: string
        dsEmail: string
        nrTelefone: string
        dtNascimento: string
        dsGenero: string
        dsObservacoes: string
        xAtivo: boolean
        nrCep: string
        dsCidade: string
        dsEstado: string
        dsEndereco: string
        dsBairro: string
        nrNumero: string
        dsComplemento: string
    }

    interface Breadcrumb {
        title: string
        disabled: boolean
        href?: string
    }

    interface Cabecalhos {
        title: string
        key: string
        align?: 'start' | 'end' | 'center'
        sortable?: boolean
    }

    export default defineComponent({
        name: 'PessoasPage',

        components: {
            HeaderComponent,
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
                items: [
                    { title: 'Home', disabled: false, href: '/' },
                    { title: 'Perfis', disabled: true },
                    { title: 'Pessoas', disabled: true, href: '/pessoas' },
                ] as Breadcrumb[],

                loadingCep: false,

                cepError: '',

                search: '',

                tab: 'one',

                currentYear: new Date().getFullYear(),

                pessoas: [] as Pessoa[],

                formModel: {
                    dsPessoa: '',
                    nrCpf: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dtNascimento: '',
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
                } as Pessoa,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdPessoa' },
                    { title: 'Nome', key: 'dsPessoa', align: 'start' },
                    { title: 'E-mail', key: 'dsEmail' },
                    { title: 'CPF', key: 'nrCpf' },
                    { title: 'Gênero', key: 'dsGenero', align: 'end' },
                    { title: 'Nascimento', key: 'dtNascimento', align: 'end' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as Cabecalhos[],

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
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdPessoa
            },
        },

        mounted () {
            this.reset()
            document.title = 'Library | Pessoas'
        },

        methods: {
            newRecord (): Pessoa {
                return {
                    dsPessoa: '',
                    nrCpf: '',
                    dsEmail: '',
                    nrTelefone: '',
                    dtNascimento: '',
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

            add (): void {
                this.formModel = this.newRecord()
                this.dialog = true
            },

            edit (id: number): void {
                const found = this.pessoas.find(pessoa => pessoa.cdPessoa === id)

                if (!found) {
                    return
                }

                this.formModel = { ...found }
                this.dialog = true
            },

            remove (id: number): void {
                const index = this.pessoas.findIndex(pessoa => pessoa.cdPessoa === id)

                if (index !== -1) {
                    this.pessoas.splice(index, 1)
                }
            },

            save (): void {
                if (this.editando) {
                    const index = this.pessoas.findIndex(pessoa => pessoa.cdPessoa === this.formModel.cdPessoa)
                    if (index !== -1) this.pessoas[index] = { ...this.formModel }
                } else {
                    this.formModel.cdPessoa = this.pessoas.length + 1
                    this.pessoas.push({ ...this.formModel })
                }

                this.dialog = false
            },

            reset (): void {
                this.dialog = false
                this.formModel = this.newRecord()
                this.pessoas = [
                    {
                        cdPessoa: 1,
                        dsPessoa: 'Oliveto Vinicius Di Domenico',
                        nrCpf: '115.407.919-80',
                        dsEmail: 'olivetoovinicius@gmail.com',
                        nrTelefone: '(11) 99999-9999',
                        dtNascimento: '05/03/2001',
                        dsGenero: 'Masculino',
                        dsObservacoes: '',
                        xAtivo: true,
                        nrCep: '12345-678',
                        dsCidade: 'São Paulo',
                        dsEstado: 'São Paulo (SP)',
                        dsEndereco: 'Rua Exemplo',
                        dsBairro: 'Bairro Exemplo',
                        nrNumero: '123',
                        dsComplemento: 'Apto 456',
                    },
                ]
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
</style>
