<template>
    <v-text-field
        :model-value="modelValue"
        :label="undefined"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        persistent-placeholder
        readonly
        clearable
        :rules="rules"
        @click="dialogAberto = true"
        @click:clear="onClear"
    >
        <template #label>
            {{ label }} <span v-if="required" class="text-error">*</span>
        </template>
    </v-text-field>

    <SelectorModal
        v-model="dialogAberto"
        :title="title"
        :items="items"
        :item-value="itemValue"
        :item-title="itemTitle"
        @select="onSelect"
    />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import SelectorModal from '@/components/SelectorComponent.vue'

export default defineComponent({
    name: 'SelectorField',

    components: { SelectorModal },

    props: {
        modelValue: { type: [Number, String] as PropType<number | string | null>, default: null },
        label: { type: String, required: true },
        title: { type: String, default: 'Selecione um registro' },
        items: { type: Array as PropType<Record<string, any>[]>, required: true },
        itemValue: { type: String, default: 'id' },
        itemTitle: { type: String, default: 'descricao' },
        required: { type: Boolean, default: false },
        rules: { type: Array as PropType<((v: any) => true | string)[]>, default: () => [] },
    },

    emits: ['update:modelValue', 'select', 'clear'],

    data () {
        return {
            dialogAberto: false,
        }
    },

    methods: {
        onSelect (item: Record<string, any>) {
            this.$emit('update:modelValue', item[this.itemValue])
            this.$emit('select', item)
        },

        onClear () {
            this.$emit('update:modelValue', null)
            this.$emit('clear')
        },
    },
})
</script>