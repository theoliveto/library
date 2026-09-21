<template>
    <v-text-field
        v-model="model"
        variant="outlined"
        persistent-placeholder
        clearable
        type="email"
        maxlength="100"
        :rules="regras"
        :error-messages="errorMessages"
    >
        <template #label>
            {{ label }}
            <span v-if="required" class="text-error">*</span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { ValidationRule } from '@/utils/validators'
    import { required as requiredRule, email as emailRule, maxLength, } from '@/utils/validators'

    const model = defineModel<string | null>()

    const props = withDefaults(
        defineProps<{
            label?: string
            required?: boolean
            errorMessages?: string | string[]
            rules?: ValidationRule[]
        }>(),
        {
            label: 'E-mail',
            required: false,
            errorMessages: '',
            rules: () => [],
        }
    )

    const regras = computed(() => {
        const regras: ValidationRule[] = [
            emailRule(),
            maxLength(100),
        ]

        if (props.required) {
            regras.unshift(requiredRule())
        }

        regras.push(...props.rules)

        return regras
    })
</script>