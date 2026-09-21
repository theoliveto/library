<template>
    <v-text-field
        v-model="model"
        variant="outlined"
        persistent-placeholder
        clearable
        :rules="rulesFinais"
    >
        <template #label>
            {{ label }}
            <span v-if="required" class="text-error">*</span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
    import type { ValidationRule } from '@/utils/validators'
    import { required as requiredRule } from '@/utils/validators'
    import { computed } from 'vue';

    const model = defineModel<string | null>()

    const props = withDefaults(
        defineProps<{
            label?: string
            required?: boolean
            rules?: ValidationRule[]
        }>(),
        {
            label: '',
            required: false,
            rules: () => [],
        }
    )

    const rulesFinais = computed(() => {
        const regras = [...props.rules]

        if (props.required) {
            regras.unshift(requiredRule())
        }

        return regras
    })
</script>