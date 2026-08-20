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

            <template #bottom="{ page, itemsPerPage, pageCount, setPage, setItemsPerPage }">
                <div class="d-flex align-center justify-space-between px-4 py-2 border-t">
                    <v-btn
                        color="success"
                        prepend-icon="mdi-microsoft-excel"
                        text="Exportar"
                        @click="exportToExcel"
                    />

                    <div class="d-flex align-center">
                        <span class="text-body-2 me-3">Itens por página:</span>

                        <v-select
                            :model-value="itemsPerPage"
                            :items="[10, 25, 50, 100]"
                            density="compact"
                            variant="outlined"
                            hide-details
                            style="width: 90px"
                            @update:model-value="setItemsPerPage"
                        />

                        <span class="text-body-2 mx-4">
                            {{ page }}-{{ Math.min(page * itemsPerPage, items.length) }} de {{ items.length }}
                        </span>

                        <v-btn
                            icon="mdi-page-first"
                            variant="text"
                            size="small"
                            :disabled="page <= 1"
                            @click="setPage(1)"
                        />

                        <v-btn
                            icon="mdi-chevron-left"
                            variant="text"
                            size="small"
                            :disabled="page <= 1"
                            @click="setPage(page - 1)"
                        />

                        <v-btn
                            icon="mdi-chevron-right"
                            variant="text"
                            size="small"
                            :disabled="page >= pageCount"
                            @click="setPage(page + 1)"
                        />

                        <v-btn
                            icon="mdi-page-last"
                            variant="text"
                            size="small"
                            :disabled="page >= pageCount"
                            @click="setPage(pageCount)"
                        />
                    </div>
                </div>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import * as XLSX from 'xlsx'

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

            exportToExcel () {
                const data = this.items.map(item => {
                    const row: Record<string, any> = {}

                    this.headers.forEach(header => {
                        if (!header.key || header.key === 'actions') return

                        row[header.title ?? header.key] = item[header.key]
                    })

                    return row
                })

                const worksheet = XLSX.utils.json_to_sheet(data)

                const workbook = XLSX.utils.book_new()

                XLSX.utils.book_append_sheet(
                    workbook,
                    worksheet,
                    'Dados',
                )

                XLSX.writeFile(
                    workbook,
                    `${this.title}.xlsx`,
                )
            },
        },
    })
</script>

<style scoped>

</style>
