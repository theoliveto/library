<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
        <v-card>
            <v-card-title>{{ title }}</v-card-title>

            <v-card-text>
                <v-text-field
                    v-if="searchable"
                    v-model="busca"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="compact"
                    placeholder="Buscar..."
                    clearable
                    hide-details
                    class="mb-2"
                />

                <v-list style="max-height: 400px; overflow-y: auto;">
                    <v-list-item v-for="item in itensFiltrados" :key="item[itemValue]" @click="selecionar(item)">
                        <v-list-item-title>{{ item[itemValue] }} - {{ item[itemTitle] }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="itensFiltrados.length === 0">
                        <v-list-item-title class="text-grey">Nenhum registro encontrado</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue';

    export default defineComponent({
        name: 'SelectorModal',

        props: {
            modelValue: { type: Boolean, required: true },
            title: { type: String, default: 'Selecione um registro' },
            items: { type: Array as PropType<Record<string, any>[]>, required: true },
            itemValue: { type: String, default: 'codigo' },
            itemTitle: { type: String, default: 'descricao' },
            searchable: { type: Boolean, default: true }
        },

        emits: ['update:modelValue', 'select'],

        data() {
            return {
                busca: ''
            };
        },

        computed: {
            itensFiltrados(): Record<string, any>[] {
                if (!this.busca) return this.items;
                const termo = this.busca.toLowerCase();
                return this.items.filter(item =>
                    String(item[this.itemValue]).toLowerCase().includes(termo) ||
                    String(item[this.itemTitle]).toLowerCase().includes(termo)
                );
            }
        },
        
        methods: {
            selecionar(item: Record<string, any>) {
                this.$emit('select', item);
                this.$emit('update:modelValue', false);
            }
        }
    });
</script>