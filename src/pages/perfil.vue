<template>
    <v-app>
        <HeaderComponent />

        <v-main>
            <v-container fluid class="mt-5">
                <v-sheet elevation="2" class="pa-4" rounded>
                    <template #default>
                        <v-row class="mt-3">
                            <v-col cols="12">
                                <v-avatar size="120" class="mb-3" style="cursor: pointer;" v-model="formModel.imPerfil" @click="abrirSeletor">
                                    <v-img v-if="previewUrl" :src="previewUrl" cover />
                                    <v-icon v-else size="60">mdi-account-circle</v-icon>
                                </v-avatar>

                                <input
                                    ref="inputFile"
                                    type="file"
                                    accept="image/*"
                                    class="d-none"
                                    @change="onFileSelected"
                                />
                            </v-col>

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
            </v-container>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { modelService, type ModelDto, type ModelCreateDto } from '../services/Usuarios/service.ts'
    import { decimal, email, integer, maxLength, minLength, numeric, required, textOnly } from '@/utils/validators.ts'
    import { useSnackbar } from '@/utils/useSnackbar'

    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import MessageComponent from '@/components/MessageComponent.vue'

    export default defineComponent ({
        name: 'PerfilPage',

        data() {
            return {
                formModel: {
                    dsUsuario: '',
                    dsLogin: '',
                    dsEmail: '',
                    dsSenha: '',
                    dsObservacoes: '',
                    xAtivo: true,
                    xAdministrador: false,
                    imPerfil: null,
                } as ModelDto,

                visible: false,
                emailError: '',
                previewUrl: null as string | null,
                arquivoSelecionado: null as File | null,
            };
        },

        components: {
            HeaderComponent,
            FooterComponent,
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


        mounted () {
            document.title = this.$route.meta.title as string
        },

        methods: {
            abrirSeletor() {
                (this.$refs.inputFile as HTMLInputElement).click();
            },

            onFileSelected(event: Event) {
                const input = event.target as HTMLInputElement;
                const file = input.files?.[0];
                if (!file) return;

                this.arquivoSelecionado = file;
                this.previewUrl = URL.createObjectURL(file);
            },
        },
    })
</script>
