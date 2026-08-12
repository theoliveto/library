<template>
    <v-navigation-drawer v-model="drawer" color="blue-grey-darken-3">
        <v-list>
            <v-list-item title="Menu" class="menuSize" />

            <v-list-item to="/" prepend-icon="mdi-home-variant-outline" title="Home" />

            <v-list-group value="Perfis">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Perfis" />
                </template>

                <div class="setback">
                    <v-list-item to="/pessoas" title="Pessoas" prepend-icon="mdi-account-group-outline" />
                    <v-list-item to="/usuarios" title="Usuários" prepend-icon="mdi-account-edit-outline" />
                </div>
            </v-list-group>

            <v-list-group value="Acervo">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-bookmark-box-multiple" title="Acervo" />
                </template>

                <div class="setback">
                    <v-list-item to="/livros" title="Livros" prepend-icon="mdi-book" />
                    <v-list-item to="/autores" title="Autores" prepend-icon="mdi-fountain-pen-tip" />
                    <v-list-item to="/categorias" title="Categorias" prepend-icon="mdi-content-duplicate" />
                    <v-list-item to="/editoras" title="Editoras" prepend-icon="mdi-newspaper-variant-outline" />
                    <v-list-item to="/exemplares" title="Exemplares" prepend-icon="mdi-book-multiple-outline" />
                </div>
            </v-list-group>

            <v-list-group value="Circulação">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-sync" title="Circulação" />
                </template>

                <div class="setback">
                    <v-list-item to="/emprestimos" title="Empréstimos" prepend-icon="mdi-arrow-u-right-top-bold" />
                    <v-list-item to="/devolucoes" title="Devoluções" prepend-icon="mdi-arrow-u-left-top-bold" />
                    <v-list-item to="/reservas" title="Reservas" prepend-icon="mdi-bookmark-check-outline" />
                </div>
            </v-list-group>

            <v-list-group value="Controle">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-camera-control" title="Controle" />
                </template>

                <div class="setback">
                    <v-list-item to="/atrasados" title="Atrasados" prepend-icon="mdi-clock-alert-outline" />
                    <v-list-item to="/multas" title="Multas" prepend-icon="mdi-cash-minus" />
                    <v-list-item to="/historico" title="Histórico" prepend-icon="mdi-history" />
                </div>
            </v-list-group>

            <v-list-item to="/relatorios" prepend-icon="mdi-chart-box-outline" title="Relatórios" />
        </v-list>
    </v-navigation-drawer>

    <v-app-bar>
        <template #prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer" />
        </template>

        <template #append>
            <v-menu>
                <template #activator="{ props }">
                    <v-btn v-bind="props" icon class="mr-3">
                        <v-badge content="3" color="error" floating>
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-badge>
                    </v-btn>
                </template>

                <v-list min-width="320">
                    <v-list-subheader>Notificações</v-list-subheader>
                    <v-list-item prepend-icon="mdi-book-clock" title="Livro em atraso" subtitle="João da Silva está com um livro atrasado" />
                    <v-list-item prepend-icon="mdi-book-plus" title="Nova reserva" subtitle="O Pequeno Príncipe foi reservado" />
                    <v-list-item prepend-icon="mdi-alert" title="Exemplar indisponível" subtitle="Exemplar #102 está em manutenção" />
                    <v-divider />
                    <v-list-item title="Ver todas as notificações" class="text-center" />
                </v-list>
            </v-menu>

            <v-menu>
                <template #activator="{ props }">
                    <v-btn v-bind="props" icon class="mr-2">
                        <v-avatar color="primary" size="40">
                            <span class="text-white">GC</span>
                        </v-avatar>
                    </v-btn>
                </template>

                <v-list min-width="200">
                    <v-list-item to="/perfil" prepend-icon="mdi-account" title="Meu perfil" />
                    <v-list-item to="/configuracoes" prepend-icon="mdi-cog" title="Configurações" />
                    <v-divider />
                    <v-list-item to="/sair" prepend-icon="mdi-logout" title="Sair" />
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'HeaderComponent',
        data () {
            return {
                drawer: true,
                user: 'Oliveto',

            }
        },
    })
</script>

<style scoped>
    .menuSize {
        height: 57px;
    }

    .setback {
        margin-left: -30px;
    }
</style>
