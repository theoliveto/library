<template>
    <v-dialog :model-value="modelValue" @update:model-value="onUpdateModelValue" :max-width="maxWidth" persistent>
        <v-card>
            <v-card-title class="d-flex align-center bg-blue-lighten-4 pa-5">
                <div class="font-spacing">
                    <div class="text-headline-small font-weight-medium">{{ title }}</div>
                    <div v-if="subtitle" class="text-title-medium font-weight-light">{{ subtitle }}</div>
                </div>

                <v-spacer />

                <v-switch
                    v-if="activeSwitch !== undefined"
                    :model-value="activeSwitch"
                    @update:model-value="onUpdateActiveSwitch"
                    label="Ativo"
                    color="primary"
                    hide-details
                />
            </v-card-title>

            <v-tabs v-if="tabs.length" :model-value="tabModel" @update:model-value="onUpdateTabModel" color="primary">
                <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.title }}</v-tab>
            </v-tabs>

            <v-divider />

            <v-card-text class="pa-4">
                <v-row class="mt-1">
                    <slot />
                </v-row>
            </v-card-text>

            <v-divider />

            <v-card-actions class="bg-surface-light">
                <v-btn color="red-lighten-1" text="Cancelar" variant="plain" @click="closeDialog" />
                <v-spacer />
                <v-btn color="green-darken-1" text="Salvar" @click="$emit('save')" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue'

    export interface TabItem {
        title: string
        value: string
    }

    export default defineComponent({
        name: 'DialogComponent',

        props: {
            modelValue: { type: Boolean, required: true },
            title: { type: String, default: '' },
            subtitle: { type: String, default: '' },
            maxWidth: { type: [String, Number], default: 1000 },
            tabs: { type: Array as PropType<TabItem[]>, default: () => [] },
            tabModel: { type: String, default: '' },
            activeSwitch: { type: Boolean as PropType<boolean | undefined>, default: undefined },
        },

        emits: ['update:model-value', 'update:tab-model', 'update:active-switch', 'save', 'cancel'],

        methods: {
            onUpdateModelValue (val: boolean) {
                this.$emit('update:model-value', val)
            },
            onUpdateTabModel (val: string) {
                this.$emit('update:tab-model', val)
            },
            onUpdateActiveSwitch (val: boolean | null) {
                this.$emit('update:active-switch', val ?? false)
            },
            closeDialog () {
                this.$emit('update:model-value', false)
                this.$emit('cancel')
            },
        },
    })
</script>
