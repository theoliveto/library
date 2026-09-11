<template>
    <v-text-field
        :model-value="modelValue"
        :loading="loadingCep"
        :error-messages="cepError"
        inputmode="numeric"
        variant="outlined"
        persistent-placeholder
        clearable
        :rules="[required(), cep()]"
        @update:model-value="onInput"
        @blur="buscarCep"
    >
        <template #label>
            CEP <span v-if="required()" class="text-error">*</span>
        </template>
    </v-text-field>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import { required, cep } from '@/utils/validators'

    export interface EnderecoViaCep {
        logradouro: string
        bairro: string
        localidade: string
        uf: string
        complemento: string
    }

    export default defineComponent({
        name: 'CepFieldComponent',

        props: {
            modelValue: {
                type: String as PropType<string>,
                default: '',
            },
        },

        emits: ['update:modelValue', 'endereco-encontrado', 'endereco-nao-encontrado'],

        data () {
            return {
                loadingCep: false,
                cepError: '',
            }
        },

        methods: {
            required,
            cep,

            onInput (valor: string) {
                const mascarado = this.cepMask(valor)
                this.$emit('update:modelValue', mascarado)
            },

            cepMask (valor: string): string {
                let cepLimpo = valor.replace(/\D/g, '')
                cepLimpo = cepLimpo.slice(0, 8)

                if (cepLimpo.length > 5) {
                    cepLimpo = cepLimpo.replace(/^(\d{5})(\d)/, '$1-$2')
                }

                return cepLimpo
            },

            async buscarCep () {
                const cepLimpo = this.modelValue.replace(/\D/g, '')

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
                        this.$emit('endereco-nao-encontrado')
                        return
                    }

                    const endereco: EnderecoViaCep = {
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        localidade: data.localidade,
                        uf: data.uf,
                        complemento: data.complemento,
                    }

                    this.$emit('endereco-encontrado', endereco)
                } catch (error) {
                    this.cepError = 'Erro ao consultar CEP'
                    console.error(error)
                } finally {
                    this.loadingCep = false
                }
            },
        },
    })
</script>