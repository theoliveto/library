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
                    <v-data-table :headers="headers" :items="usuarios" :search="search">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-icon color="medium-emphasis" icon="mdi-account-edit-outline" size="default" start />
                                    <span class="font-spacing">Usuários</span>
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
                                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="item.cdUsuario !== undefined && edit(item.cdUsuario)" />
                                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="item.cdUsuario !== undefined && remove(item.cdUsuario)" />
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
                            <div class="text-headline-small font-weight-medium">{{ `${editando ? 'Editando' : 'Inserindo'} um usuário` }}</div>
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
                        <v-tab value="one">Dados Gerais</v-tab>
                    </v-tabs>

                    <v-divider />

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-sheet class="pa-4">
                                <template #default>
                                    <v-row class="mt-3">
                                        <v-col cols="5">
                                            <v-text-field
                                                v-model="formModel.dsUsuario"
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

                                        <v-col cols="5">
                                            <v-text-field
                                                v-model="formModel.dsLogin"
                                                variant="outlined"
                                                persistent-placeholder
                                                clearable
                                                :rules="[required(), textOnly(), maxLength(150)]"
                                            >
                                                <template #label>
                                                    Login <span class="text-error">*</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="2">
                                            <v-checkbox
                                                class="mt-2"
                                                v-model="formModel.xAdministrador"
                                                label="Administrador"
                                                density="compact"
                                                color="primary"
                                            />
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
                                                v-model="formModel.dsSenha"
                                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                :type="visible ? 'text' : 'password'"
                                                label="Senha"
                                                variant="outlined"
                                                persistent-placeholder
                                                @click:append-inner="visible = !visible"
                                                :rules="[required(), maxLength(50)]"
                                            >
                                                <template #label>
                                                    Senha <span class="text-error">*</span>
                                                </template>
                                            </v-text-field>
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

    interface Usuario {
        cdUsuario?: number
        dsUsuario: string
        dsLogin: string
        dsEmail: string
        dsSenha: string
        dsObservacoes: string
        xAtivo: boolean
        xAdministrador: boolean
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

    export default defineComponent ({
        name: 'UsuariosPage',

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
                    { title: 'Usuários', disabled: true, href: '/usuarios' },
                ] as Breadcrumb[],

                search: '',

                tab: 'one',

                currentYear: new Date().getFullYear(),

                usuarios: [] as Usuario[],

                formModel: {
                    dsUsuario: '',
                    dsLogin: '',
                    dsEmail: '',
                    dsSenha: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    xAdministrador: false,
                } as Usuario,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdUsuario' },
                    { title: 'Nome', key: 'dsUsuario', align: 'start' },
                    { title: 'E-mail', key: 'dsEmail' },
                    { title: 'Login', key: 'dsLogin' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as Cabecalhos[],

                ativo: false,

                visible: false,
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdUsuario
            },
        },

        mounted () {
            this.reset()
            document.title = 'Library | Usuários'
        },

        methods: {
            newRecord (): Usuario {
                return {
                    dsUsuario: '',
                    dsLogin: '',
                    dsEmail: '',
                    dsSenha: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    xAdministrador: false,
                }
            },

            add (): void {
                this.formModel = this.newRecord()
                this.dialog = true
            },

            edit (id: number): void {
                const found = this.usuarios.find(usuario => usuario.cdUsuario === id)

                if (!found) {
                    return
                }

                this.formModel = { ...found }
                this.dialog = true
            },

            remove (id: number): void {
                const index = this.usuarios.findIndex(usuario => usuario.cdUsuario === id)

                if (index !== -1) {
                    this.usuarios.splice(index, 1)
                }
            },

            save (): void {
                if (this.editando) {
                    const index = this.usuarios.findIndex(usuario => usuario.cdUsuario === this.formModel.cdUsuario)
                    if (index !== -1) this.usuarios[index] = { ...this.formModel }
                } else {
                    this.formModel.cdUsuario = this.usuarios.length + 1
                    this.usuarios.push({ ...this.formModel })
                }

                this.dialog = false
            },

            reset (): void {
                this.dialog = false
                this.formModel = this.newRecord()
                this.usuarios = [
                    {
                        cdUsuario: 1,
                        dsUsuario: 'Oliveto Vinicius Di Domenico',
                        dsLogin: 'oliveto',
                        dsEmail: 'olivetoovinicius@gmail.com',
                        dsSenha: '@Oliveto10',
                        dsObservacoes: '',
                        xAtivo: true,
                        xAdministrador: true,
                    },
                ]
            },
        },
    })
</script>
