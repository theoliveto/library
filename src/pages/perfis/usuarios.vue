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
                    title="Excluir usuário"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} um usuário`"
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

                                    <v-col cols="6">
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
                                            :rules="[maxLength(500)]"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-checkbox
                                            v-model="formModel.xAdministrador"
                                            label="Administrador"
                                            density="compact"
                                            color="primary"
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Usuarios/service.ts'
    import { decimal, email, integer, maxLength, minLength, numeric, required, textOnly } from '@/utils/validators.ts'
    import { useSnackbar } from '@/utils/useSnackbar'

    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    export default defineComponent ({
        name: 'UsuariosPage',

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            MessageComponent,
        },

        setup () {
            const { success, error, warning, info } = useSnackbar()

            return {
                decimal,
                email,
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

        data () {
            return {
                emailError: '',
                search: '',

                registros: [] as ModelDto[],

                formModel: {
                    dsUsuario: '',
                    dsLogin: '',
                    dsEmail: '',
                    dsSenha: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    xAdministrador: false,
                } as ModelDto,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdUsuario' },
                    { title: 'Nome', key: 'dsUsuario', align: 'start' },
                    { title: 'E-mail', key: 'dsEmail' },
                    { title: 'Login', key: 'dsLogin' },
                    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
                ] as TableHeader[],

                ativo: false,

                visible: false,

                currentTab: 'dados-gerais',

                tabsConfig: [
                    { title: 'Dados Gerais', value: 'dados-gerais' },
                ] as TabItem[],

                messageDialog: false,
                excluirRegistro: null as number | null,
            }
        },

        computed: {
            editando (): boolean {
                return !!this.formModel.cdUsuario
            },

            tableMeta() {
                return (this.$route.meta.table as any) || {}
            }
        },

        async mounted () {
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

            novo(): ModelDto {
                return {
                    cdUsuario: 0,
                    dsUsuario: '',
                    dsLogin: '',
                    dsEmail: '',
                    dsSenha: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    xAdministrador: false,
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.registros.find(r => r.cdUsuario === id)
                if (!found) return
                this.formModel = { ...found }
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
                    dsUsuario: this.formModel.dsUsuario,
                    dsLogin: this.formModel.dsLogin,
                    dsEmail: this.formModel.dsEmail,
                    dsSenha: this.formModel.dsSenha,
                    dsObservacoes: this.formModel.dsObservacoes || null,
                    xAtivo: this.formModel.xAtivo,
                    xAdministrador: this.formModel.xAdministrador,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await modelService.atualizar(this.formModel.cdUsuario, payload)
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
