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
                v-model:active-switch="formModel.ativo"
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
                                            v-model="formModel.descricao"
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
                                            v-model="formModel.razaoSocial"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), textOnly(), maxLength(150)]"
                                        >
                                            <template #label>
                                                Razão Social <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6">
                                        <SelectorField
                                            v-model="formModel.usuarioId"
                                            label="Usuário"
                                            title="Selecione um Usuário"
                                            :items="usuarios"
                                            item-value="usuarioId"
                                            item-title="usuario"
                                            required
                                            :rules="[required()]"
                                            @select="(item: { usuario: string | null }) => formModel.usuario = item.usuario"
                                            @clear="formModel.usuario = ''"
                                        />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="formModel.cpfCnpj"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), cpf()]"
                                            :error-messages="cpfError"
                                            @update:model-value="value => formModel.cpfCnpj = cpfMask(value)"
                                        >
                                            <template #label>
                                                CPF <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.email"
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
                                            v-model="formModel.celular"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            :rules="[required(), phone()]"
                                            @update:model-value="value => formModel.celular = phoneFlexibleMask(value)"
                                        >
                                            <template #label>
                                                Celular <span class="text-error">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.telefone"
                                            variant="outlined"
                                            persistent-placeholder
                                            clearable
                                            label="Telefone"
                                            :rules="[phone()]"
                                            @update:model-value="value => formModel.telefone = phoneFlexibleMask(value)"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-date-input
                                            class="mt-n2"
                                            v-model="formModel.nascimento"
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
                                            v-model="formModel.genero"
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

                    <v-tabs-window-item value="endereco">
                        <v-sheet class="pa-4">
                            <template #default>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <CepField
                                            v-model="formModel.cep"
                                            @endereco-encontrado="preencherEndereco"
                                            @endereco-nao-encontrado="limparEndereco"
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            class="mt-n2"
                                            v-model="formModel.endereco"
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

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            v-model="formModel.cidade"
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
                                            v-model="formModel.estado"
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
                                            v-model="formModel.bairro"
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
                                            v-model="formModel.numero"
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
                                            v-model="formModel.complemento"
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
    import { modelService, type ModelDto, type ModelCreateDto } from '../../services/Pessoas/service.ts'
    import { paraIso, paraDate, paraDataBR } from '@/utils/dateConverter'
    import { cepMask, cpfMask, dateMask, numberMask, onlyNumbers, phoneFlexibleMask, phoneMask } from '@/utils/masks.ts'
    import { cep, cpf, decimal, email, integer, maxLength, minLength, numeric, phone, required, textOnly } from '@/utils/validators.ts'
    import { useSnackbar } from '@/utils/useSnackbar'

    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import TableComponent, { type TableHeader } from '@/components/TableComponent.vue'
    import DialogComponent, { type TabItem } from '@/components/DialogComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'
    import SelectorComponent from '@/components/SelectorComponent.vue'
    import type { EnderecoViaCep } from '@/components/Forms/CepFieldComponent.vue'

    type FormModel = Omit<ModelDto, 'nascimento'> & { nascimento: Date | null }

    export default defineComponent({
        name: 'PessoasPage',

        components: {
            HeaderComponent,
            FooterComponent,
            TableComponent,
            DialogComponent,
            MessageComponent,
            SelectorComponent
        },

        setup () {
            const {
                success,
                error,
                warning,
                info
            } = useSnackbar()

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
                success,
                error,
                warning,
                info
            }
        },

        data () {
            return {
                loadingCep: false,
                cepError: '',
                cpfError: '',
                emailError: '',
                search: '',
                dialog: false,
                ativo: true,
                currentTab: 'dados-pessoais',
                messageDialog: false,
                excluirRegistro: null as number | null,
                currentYear: new Date().getFullYear(),

                registros: [] as ModelDto[],
                usuarios: [] as { usuarioId: number; usuario: string }[],

                formModel: {
                    id: 0,
                    descricao: '',
                    razaoSocial: '',
                    usuarioId: null,
                    usuario: '',
                    cpfCnpj: '',
                    email: '',
                    celular: '',
                    telefone: '',
                    nascimento: null,
                    genero: '',
                    cep: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
                    observacoes: '',
                    ativo: true,
                } as FormModel,

                headers: [
                    { title: 'ID', key: 'id' },
                    { title: 'Nome', key: 'descricao', align: 'start' },
                    { title: 'CPF', key: 'cpfCnpj' },
                    { title: 'E-mail', key: 'email' },
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

                tabsConfig: [
                    { title: 'Dados Pessoais', value: 'dados-pessoais' },
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

            registrosFormatadas (): ModelDto[] {
                return this.registros.map(registro => ({
                    ...registro,
                    nascimento: paraDataBR(registro.nascimento),
                }))
            },
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

            novo(): FormModel {
                return {
                    id: 0,
                    descricao: '',
                    razaoSocial: '',
                    usuarioId: null,
                    usuario: '',
                    cpfCnpj: '',
                    email: '',
                    celular: '',
                    telefone: '',
                    nascimento: null,
                    genero: '',
                    cep: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    bairro: '',
                    numero: '',
                    complemento: '',
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
                    nascimento: paraDate(found.nascimento) 
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

            montarPayload (): ModelCreateDto {
                return {
                    descricao: this.formModel.descricao,
                    razaoSocial: this.formModel.razaoSocial,
                    usuarioId: this.formModel.usuarioId,
                    usuario: this.formModel.usuario || null,
                    cpfCnpj: this.formModel.cpfCnpj,
                    email: this.formModel.email,
                    celular: this.formModel.celular,
                    telefone: this.formModel.telefone,
                    nascimento: paraIso(this.formModel.nascimento as Date),
                    genero: this.formModel.genero,
                    cep: this.formModel.cep,
                    endereco: this.formModel.endereco,
                    cidade: this.formModel.cidade,
                    estado: this.formModel.estado,
                    bairro: this.formModel.bairro,
                    numero: this.formModel.numero || null,
                    complemento: this.formModel.complemento || null,
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

            alterarCpf(value: string) {
                this.formModel.cpfCnpj = cpfMask(value)

                this.cpfError = ''

                const cpfLimpo = this.formModel.cpfCnpj.replace(/\D/g, '')

                if (cpfLimpo.length !== 11) {
                    return
                }

                this.verificarCpf()
            },

            async verificarCpf(): Promise<void> {
                try {

                    const response = await modelService.verificarCpf(
                        this.formModel.cpfCnpj,
                        this.formModel.id
                    )

                    if (response.existe) {
                        this.cpfError = 'Este CPF já está cadastrado.'
                    }

                } catch (error) {
                    console.error('Erro ao verificar CPF:', error)

                }
            },

            alterarEmail(value: string) {
                this.formModel.email = value

                this.emailError = ''

                if (!value) {
                    return
                }

                this.verificarEmail()
            },

            async verificarEmail(): Promise<void> {
                try {

                    const response = await modelService.verificarEmail(
                        this.formModel.email,
                        this.formModel.id
                    )

                    if (response.existe) {
                        this.emailError = 'Este e-mail já está cadastrado.'
                    }

                } catch (error) {

                    console.error('Erro ao verificar e-mail:', error)

                }
            },

            preencherEndereco (endereco: EnderecoViaCep) {
                this.formModel.endereco = endereco.logradouro
                this.formModel.bairro = endereco.bairro
                this.formModel.cidade = endereco.localidade
                this.formModel.estado = this.buscarEstadoPorUf(endereco.uf) || ''
                this.formModel.complemento = endereco.complemento
            },

            buscarEstadoPorUf (uf: string) {
                return this.estados.find(estado => estado.endsWith(`(${uf})`))
            },

            limparEndereco () {
                this.formModel.endereco = ''
                this.formModel.bairro = ''
                this.formModel.cidade = ''
                this.formModel.estado = ''
                this.formModel.complemento = ''
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
