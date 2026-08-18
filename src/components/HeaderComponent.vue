<template>
    <v-navigation-drawer v-model="drawer" color="blue-grey-darken-4" width="250">
        <v-list density="compact">
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

        <v-menu v-model="menuAberto" location="bottom start" :offset="8">
            <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" class="empresa-ativador" height="58" rounded="0">
                    <v-avatar size="32" color="blue-lighten-5" class="mr-2">
                        <v-icon color="blue" size="18" icon="mdi-office-building-outline" />
                    </v-avatar>

                    <div class="empresa-atual">
                        <div class="empresa-nome">{{ empresaSelecionada.nome }}</div>
                        <div class="empresa-cnpj">{{ empresaSelecionada.cnpj }}</div>
                    </div>

                    <v-icon size="18" class="ml-3" icon="mdi-chevron-down" />
                </v-btn>
            </template>

            <v-card width="288" rounded="lg" elevation="3" class="empresa-menu">
                <div class="titulo-empresas">INSTITUIÇÕES</div>

                <div
                    v-for="empresa in empresas"
                    :key="empresa.cnpj"
                    class="empresa-item"
                    :class="{ 'empresa-item-ativa': empresa.cnpj === empresaSelecionada.cnpj }"
                    @click="selecionarEmpresa(empresa)"
                >
                    <v-avatar size="28" :color="empresa.cnpj === empresaSelecionada.cnpj ? 'blue' : 'grey-lighten-3'">
                        <span :class="empresa.cnpj === empresaSelecionada.cnpj ? 'text-white' : 'text-grey-darken-1'" class="sigla">{{ empresa.sigla }}</span>
                    </v-avatar>

                    <div class="empresa-info">
                        <div class="empresa-item-nome">{{ empresa.nome }}</div>
                        <div class="empresa-item-cnpj">{{ empresa.cnpj }}</div>
                    </div>

                    <div v-if="empresa.cnpj === empresaSelecionada.cnpj" class="indicador-ativo" />
                </div>
            </v-card>
        </v-menu>

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
                    <v-list-item to="/login" prepend-icon="mdi-logout" title="Sair" />
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
                menuAberto: false,
                empresas: [
                    {
                        nome: 'C.E. Monte das Oliveiras',
                        cnpj: '12.345.678/0001-90',
                        sigla: 'MO',
                    },
                    {
                        nome: 'Biblioteca Yeshivá',
                        cnpj: '12.345.678/0002-71',
                        sigla: 'BY',
                    },
                ],
                empresaSelecionada: ({
                    nome: 'C.E. Monte das Oliveiras',
                    cnpj: '12.345.678/0001-90',
                    sigla: 'MO',
                }),
            }
        },
        methods: {
            selecionarEmpresa (empresa: any) {
                this.empresaSelecionada = empresa
                this.menuAberto = false
            },
        },
    })
</script>

<style scoped>
    .setback {
        margin-left: -30px;
    }

    .empresa-ativador {
        text-transform: none;
        letter-spacing: normal;
        padding: 0 12px;
        justify-content: flex-start;
    }

    .empresa-atual {
        text-align: left;
        line-height: 1.15;
    }

    .empresa-nome {
        font-size: 14px;
        font-weight: 500;
        color: #172033;
    }

    .empresa-cnpj {
        font-size: 12px;
        color: #718096;
        margin-top: 3px;
    }

    .empresa-menu {
        padding: 8px 6px 8px 6px;
    }

    .titulo-empresas {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
        letter-spacing: 0.8px;
        padding: 7px 12px 8px;
    }

    .empresa-item {
        display: flex;
        align-items: center;
        min-height: 58px;
        padding: 8px 12px;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .empresa-item:hover {
        background-color: #f5f7fa;
    }

    .empresa-item-ativa {
        background-color: #e8eefc;
    }

    .empresa-item-ativa:hover {
        background-color: #e3ebfc;
    }

    .sigla {
        font-size: 11px;
        font-weight: 600;
    }

    .empresa-info {
        flex: 1;
        min-width: 0;
        margin-left: 12px;
    }

    .empresa-item-nome {
        font-size: 14px;
        color: #273142;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .empresa-item-cnpj {
        font-size: 12px;
        color: #718096;
        margin-top: 3px;
    }

    .indicador-ativo {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #2563eb;
        margin-left: 8px;
    }
</style>
