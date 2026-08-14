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
                                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="item.id !== undefined && edit(item.id)" />
                                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="item.id !== undefined && delete(item.id)" />
                            </div>
                        </template>

                        <template #no-data>
                            <v-btn
                                prepend-icon="mdi-backup-restore"
                                rounded="lg"
                                text="Reset data"
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
                            label="Pessoa Jurídica"
                            v-model="ativo"
                            color="primary"
                            hide-details
                        />
                    </v-card-title>

                    <v-tabs v-model="tab" color="primary">
                        <v-tab value="one">Dados Pessoais</v-tab>
                        <v-tab value="two">Endereço</v-tab>
                        <v-tab value="three">Outros</v-tab>
                    </v-tabs>

                    <v-divider />

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-sheet class="pa-4">
                                <template #default>
                                    <v-row class="mt-3">
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="formModel.nome"
                                                label="Nome *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.email"
                                                label="E-mail *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-select
                                                class="mt-n5"
                                                v-model="formModel.genero"
                                                label="Gênero *"
                                                :items="['Masculino', 'Feminino']"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.cpfCnpj"
                                                label="CPF/CNPJ *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-date-input
                                                class="mt-n5"
                                                v-model="formModel.nascimento"
                                                label="Dt. Nascimento *"
                                                prepend-icon=""
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
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
                                                v-model="formModel.cep"
                                                label="CEP *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="formModel.cidade"
                                                label="Cidade *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-select
                                                v-model="formModel.estado"
                                                label="Estado *"
                                                :items="estados"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.endereco"
                                                label="Endereço *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.bairro"
                                                label="Bairro *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.numero"
                                                label="Número *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.complemento"
                                                label="Complemento *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-sheet>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="three">
                            <v-sheet class="pa-4">
                                <template #default>
                                    <v-row class="mt-3">
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="formModel.nome"
                                                label="Nome *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.email"
                                                label="E-mail *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-select
                                                class="mt-n5"
                                                v-model="formModel.genero"
                                                label="Gênero *"
                                                :items="['Masculino', 'Feminino']"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="mt-n5"
                                                v-model="formModel.cpfCnpj"
                                                label="CPF/CNPJ *"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                            />
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-date-input
                                                class="mt-n5"
                                                v-model="formModel.nascimento"
                                                label="Dt. Nascimento *"
                                                prepend-icon=""
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
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

    import HeaderComponent from '@/components/HeaderComponent.vue'

    interface Pessoa {
        id?: number
        nome: string
        email: string
        cpfCnpj: string
        genero: string
        nascimento: string
        cep: string
        cidade: string
        estado: string
        endereco: string
        bairro: string
        numero: string
        complemento: string
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

        data () {
            return {
                items: [
                    { title: 'Home', disabled: false, href: '/' },
                    { title: 'Perfis', disabled: true },
                    { title: 'Pessoas', disabled: true, href: '/pessoas' },
                ] as Breadcrumb[],

                search: '',

                tab: 'one',

                currentYear: new Date().getFullYear(),

                pessoas: [] as Pessoa[],

                formModel: {
                    nome: '',
                    email: '',
                    cpfCnpj: '',
                    genero: '',
                    nascimento: '',
                    cep: '',
                    cidade: '',
                    estado: '',
                    endereco: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
                } as Pessoa,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'id' },
                    { title: 'Nome', key: 'nome', align: 'start' },
                    { title: 'E-mail', key: 'email' },
                    { title: 'CPF/CNPJ', key: 'cpfCnpj' },
                    { title: 'Gênero', key: 'genero', align: 'end' },
                    { title: 'Nascimento', key: 'nascimento', align: 'end' },
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
                return !!this.formModel.id
            },
        },

        mounted () {
            this.reset()
        },

        methods: {
            newRecord (): Pessoa {
                return {
                    nome: '',
                    email: '',
                    cpfCnpj: '',
                    genero: '',
                    nascimento: '',
                    cep: '',
                    cidade: '',
                    estado: '',
                    endereco: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
                }
            },

            add (): void {
                this.formModel = this.newRecord()
                this.dialog = true
            },

            edit (id: number): void {
                const found = this.pessoas.find(pessoa => pessoa.id === id)

                if (!found) {
                    return
                }

                this.formModel = { ...found }
                this.dialog = true
            },

            delete (id: number): void {
                const index = this.pessoas.findIndex(pessoa => pessoa.id === id)

                if (index !== -1) {
                    this.pessoas.splice(index, 1)
                }
            },

            save (): void {
                if (this.editando) {
                    const index = this.pessoas.findIndex(pessoa => pessoa.id === this.formModel.id)
                    if (index !== -1) this.pessoas[index] = { ...this.formModel }
                } else {
                    this.formModel.id = this.pessoas.length + 1
                    this.pessoas.push({ ...this.formModel })
                }

                this.dialog = false
            },

            reset (): void {
                this.dialog = false
                this.formModel = this.newRecord()
                this.pessoas = [
                    {
                        id: 1,
                        nome: 'Oliveto Vinicius Di Domenico',
                        email: 'olivetoovinicius@gmail.com',
                        cpfCnpj: '115.407.919-80',
                        genero: 'Masculino',
                        nascimento: '05/03/2001',
                        cep: '12345-678',
                        cidade: 'São Paulo',
                        estado: 'São Paulo (SP)',
                        endereco: 'Rua Exemplo',
                        bairro: 'Bairro Exemplo',
                        numero: '123',
                        complemento: 'Apto 456',
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
</style>
