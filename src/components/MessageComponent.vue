<template>
    <v-dialog :model-value="modelValue" max-width="450" persistent @update:model-value="onUpdateModelValue">
        <v-card>
            <v-card-title class="d-flex align-center bg-blue-lighten-4 pa-4">
                <v-icon :icon="iconTitle" class="mr-3" />
                <span>{{ title }}</span>
            </v-card-title>

            <v-card-text class="pa-5">
                <div class="text-body-1">{{ message }}</div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0 justify-end">
                <v-btn variant="outlined" @click="handleCancel" :text="cancelText" />
                <v-btn :color="confirmColor" variant="flat" @click="handleConfirm" :text="confirmText" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'ConfirmDialog',

        props: {
            modelValue: { type: Boolean, required: true },
            title: { type: String, default: 'Confirmação' },
            message: { type: String, required: true },
            confirmText: { type: String, default: 'Sim' },
            cancelText: { type: String, default: 'Não' },
            confirmColor: { type: String, default: 'primary' },
            iconTitle: { type: String, default: 'mdi-help-circle-outline' }
        },

        emits: ['update:modelValue', 'confirm', 'cancel'],

        setup(props, { emit }) {
            const onUpdateModelValue = (value: boolean) => {
                emit('update:modelValue', value)
            }

            const handleConfirm = () => {
                emit('confirm')
                emit('update:modelValue', false)
            }

            const handleCancel = () => {
                emit('cancel')
                emit('update:modelValue', false)
            }

            return {
                onUpdateModelValue,
                handleConfirm,
                handleCancel
            }
        }
    })
</script>
