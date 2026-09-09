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
                    title="Excluir autor"
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
                :title="`${editando ? 'Editando' : 'Inserindo'} um autor`"
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
                                            v-model="formModel.dsAutor"
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
                                        <v-date-input
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

                                    <v-col cols="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.dtFalecimento"
                                            prepend-icon=""
                                            variant="outlined"
                                            clearable
                                            locale="pt-BR"
                                            display-format="dd/MM/yyyy"
                                            persistent-placeholder
                                            label="Dt. Falecimento"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsPais"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), textOnly(), maxLength(50)]"
                                        >
                                            <template #label>
                                                País <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-select
                                        class="mt-n2"
                                        v-model="formModel.dsGenero"
                                        :items="['Masculino', 'Feminino']"
                                        variant="outlined"
                                        persistent-placeholder
                                        clearable
                                        :rules="[required(), textOnly(), maxLength(20)]"
                                    >
                                        <template #label>
                                            Gênero <span class="text-error">*</span>
                                        </template>
                                    </v-select>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.dsSiteOficial"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            label="Site Oficial"
                                            :rules="[maxLength(100)]"
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
                </v-tabs-window>
            </DialogComponent>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Autor/service.ts'
    import { maxLength, required, textOnly } from '@/utils/validators.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { useSnackbar } from '@/utils/useSnackbar'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    type FormModel = Omit<ModelDto, 'dtNascimento'| 'dtFalecimento'> & { 
        dtNascimento: Date | null 
        dtFalecimento: Date | null
    }

    export default defineComponent ({
        name: 'AutoresPage',

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
                maxLength,
                required,
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

                registros: [] as ModelDto[],

                formModel: {
                    dsAutor: '',
                    dtNascimento: null,
                    dtFalecimento: null,
                    dsPais: '',
                    dsGenero: '',
                    dsSiteOficial: '',
                    imFoto: '',
                    dsObservacoes: '',
                    xAtivo: true,
                } as FormModel,

                dialog: false,

                headers: [
                    { title: 'ID', key: 'cdAutor' },
                    { title: 'Nome', key: 'dsAutor', align: 'start' },
                    { title: 'Nascimento', key: 'dtNascimento' },
                    { title: 'Nacionalidade', key: 'dsPais' },
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
                return !!this.formModel.cdAutor
            },

            tableMeta() {
                return (this.$route.meta.table as any) || {}
            },

            registrosFormatados (): ModelDto[] {
                return this.registros.map(registro => ({
                    ...registro,
                    dtNascimento: paraDataBR(registro.dtNascimento),
                    dtFalecimento: paraDataBR(registro.dtFalecimento),
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
                    cdAutor: 0,
                    dsAutor: '',
                    dtNascimento: null,
                    dtFalecimento: null,
                    dsPais: '',
                    dsGenero: '',
                    dsSiteOficial: '',
                    imFoto: '',
                    dsObservacoes: '',
                    xAtivo: true,
                }
            },

            adicionar(): void {
                this.formModel = this.novo()
                this.dialog = true
            },

            editar(id: number): void {
                const found = this.registros.find(r => r.cdAutor === id)
                if (!found) return
                this.formModel = { 
                    ...found, 
                    dtNascimento: paraDate(found.dtNascimento), 
                    dtFalecimento: found.dtFalecimento ? paraDate(found.dtFalecimento) : null
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
                    dsAutor: this.formModel.dsAutor,
                    dtNascimento: paraIso(this.formModel.dtNascimento as Date),
                    dtFalecimento: this.formModel.dtFalecimento ? paraIso(this.formModel.dtFalecimento as Date): null,
                    dsPais: this.formModel.dsPais,
                    dsGenero: this.formModel.dsGenero,
                    dsSiteOficial: this.formModel.dsSiteOficial,
                    imFoto: this.formModel.imFoto || null,
                    dsObservacoes: this.formModel.dsObservacoes || null,
                    xAtivo: this.formModel.xAtivo,
                }
            },

            async salvar(): Promise<void> {
                try {
                    const payload = this.montarPayload()

                    if (this.editando) {
                        await modelService.atualizar(this.formModel.cdAutor, payload)
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
