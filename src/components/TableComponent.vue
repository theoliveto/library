<template>
    <v-sheet border rounded class="mt-n3">
        <v-data-table :headers="headers" :items="items" :search="search" :item-value="itemKey">
            <template #top>
                <v-toolbar flat>
                    <v-toolbar-title>
                        <v-icon v-if="icon" color="medium-emphasis" :icon="icon" size="default" start />
                        <span class="font-spacing">{{ title }}</span>
                    </v-toolbar-title>

                    <v-spacer />

                    <v-text-field
                        label="Pesquisar"
                        v-model="search"
                        density="compact"
                        variant="outlined"
                        persistent-placeholder
                        hide-details
                        clearable
                        class="me-4"
                        max-width="300"
                    />

                    <v-btn
                        class="me-2 pa-5 bg-light-blue-darken-3"
                        color="white"
                        prepend-icon="mdi-plus"
                        text="Novo"
                        border
                        @click="$emit('add')"
                    />
                </v-toolbar>
            </template>

            <template #item.actions="{ item }">
                <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="handleAction(item, 'edit')" />
                    <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="handleAction(item, 'delete')" />
                </div>
            </template>

            <template #no-data>
                <slot name="no-data">
                    <v-btn
                        prepend-icon="mdi-backup-restore"
                        rounded="lg"
                        text="Recarregar"
                        variant="text"
                        border
                        @click="$emit('reset')"
                    />
                </slot>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue'

    export interface TableHeader {
        [key: string]: any
        title?: string
        key?: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        width?: string | number
    }

    export default defineComponent ({
        name: 'TableComponent',

        props: {
            title: { type: String, default: 'Registros' },
            icon: { type: String, default: '' },
            headers: { type: Array as PropType<TableHeader[]>, required: true },
            items: { type: Array as PropType<Record<string, any>[]>, required: true },
            itemKey: { type: String, default: 'id' },
        },

        emits: ['add', 'edit', 'delete', 'reset'],

        data () {
            return {
                search: '',
            }
        },

        methods: {
            handleAction (item: Record<string, any>, action: 'edit' | 'delete') {
                const id = item[this.itemKey] ?? item.raw?.[this.itemKey]

                if (id !== undefined) {
                    if (action === 'edit') {
                        this.$emit('edit', id)
                    } else if (action === 'delete') {
                        this.$emit('delete', id)
                    }
                }
            },
        },
    })
</script>

<style scoped>

</style>
