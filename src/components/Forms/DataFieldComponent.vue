<template>
    <v-date-input
        v-model="model"
        :class="className"
        prepend-icon=""
        variant="outlined"
        clearable
        locale="pt-BR"
        :display-format="formatarData"
        persistent-placeholder
        :rules="rules"
    >
        <template v-if="label" #label>
            {{ label }}
            <span v-if="required" class="text-error">*</span>
        </template>
    </v-date-input>
</template>

<script setup lang="ts">
    import type { ValidationRule } from '@/utils/validators'

    const model = defineModel<Date | null>()

    withDefaults(
        defineProps<{
            label?: string
            required?: boolean
            rules?: ValidationRule[]
            className?: string
        }>(),
        {
            label: '',
            required: false,
            rules: () => [],
            className: '',
        }
    )

    function formatarData(data: unknown): string {
        if (!(data instanceof Date)) {
            return ''
        }

        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }
</script>