<template>
    <v-text-field
        v-model="model"
        variant="outlined"
        persistent-placeholder
        clearable
        :label="tipoDocumento"
        :rules="regras"
        :error-messages="errorMessages"
        @update:model-value="aplicarMascara"
    >
        <template #label>
            {{ tipoDocumento }}
            <span class="text-error">*</span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { ValidationRule } from '@/utils/validators'
    import { required } from '@/utils/validators'

    const model = defineModel<string | null>()

    const props = withDefaults(
        defineProps<{
            cnpj?: boolean
            errorMessages?: string | string[]
            rules?: ValidationRule[]
        }>(),
        {
            cnpj: false,
            errorMessages: undefined,
            rules: () => [],
        }
    )

    const tipoDocumento = computed(() => {
        return props.cnpj ? 'CNPJ' : 'CPF'
    })

    const regras = computed(() => {
        return [
            required(),
            ...props.rules,
        ]
    })

    function aplicarMascara(value: string | null) {
        if (!value) {
            model.value = null
            return
        }

        const numeros = value.replace(/\D/g, '')

        model.value = props.cnpj
            ? mascararCnpj(numeros)
            : mascararCpf(numeros)
    }

    function mascararCpf(value: string): string {
        return value
            .slice(0, 11)
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2')
    }

    function mascararCnpj(value: string): string {
        return value
            .slice(0, 14)
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
    }
</script>