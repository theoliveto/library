<template>
    <v-navigation-drawer v-model="drawer" color="blue-grey-darken-4" width="260">
        <!-- Seleção de Empresas -->
        <v-menu v-model="menuAberto" location="bottom start" :offset="8">
            <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" class="empresa-ativador" height="58" rounded="0">
                    <v-avatar size="32" color="primary" class="mr-2">
                        <v-icon color="blue-lighten-5" size="18" icon="mdi-office-building-outline" />
                    </v-avatar>

                    <div class="empresa-atual">
                        <div class="empresa-nome">{{ empresaSelecionada.nome }}</div>
                        <div class="empresa-cnpj">{{ empresaSelecionada.cnpj }}</div>
                    </div>

                    <v-icon size="18" class="ml-3" icon="mdi-chevron-down" />
                </v-btn>
            </template>

            <v-card width="288" elevation="3" class="empresa-menu">
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

        <!-- Pesquisa de Menus -->
        <div class="pesquisa-sidebar">
            <v-text-field
                v-model="pesquisaMenu"
                placeholder="Pesquisar tela..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
                persistent-placeholder
                hide-details
            />
        </div>

        <!-- Menus -->
        <v-list density="compact" class="menu-principal">
            <template v-for="menu in menusFiltrados" :key="menu.title">

                <v-list-item
                    v-if="!menu.children"
                    :to="menu.to"
                    :prepend-icon="menu.icon"
                    :title="menu.title"
                />

                <v-list-group v-else :value="menu.title">
                    <template #activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            :prepend-icon="menu.icon"
                            :title="menu.title"
                        />
                    </template>

                    <div class="setback">
                        <v-list-item
                            v-for="item in menu.children"
                            :key="item.title"
                            :to="item.to"
                            :prepend-icon="item.icon"
                            :title="item.title"
                        />
                    </div>
                </v-list-group>

            </template>
        </v-list>

        <v-spacer />

        <!-- Menu de Usuário -->
        <v-menu location="top end" :offset="8">
            <template #activator="{ props }">
                <v-list-item v-bind="props" class="usuario-sidebar">
                    <template #prepend>
                        <v-avatar color="primary" size="38">
                            <span class="text-white">OD</span>
                        </v-avatar>
                    </template>

                    <v-list-item-title>{{ user }}</v-list-item-title>
                    <v-list-item-subtitle>{{ profile }}</v-list-item-subtitle>

                    <template #append>
                        <v-icon size="18" icon="mdi-chevron-up" />
                    </template>
                </v-list-item>
            </template>

            <v-card min-width="200" elevation="4" color="blue-grey-darken-4">
                <v-list density="compact" bg-color="blue-grey-darken-4">
                    <v-list-item to="/perfil" prepend-icon="mdi-account-outline" title="Meu perfil" />
                    <v-list-item to="/configuracoes" prepend-icon="mdi-cog-outline" title="Configurações" />

                    <v-divider class="my-1" />

                    <v-list-item prepend-icon="mdi-logout" title="Sair" @click="confirmarSaida" />
                </v-list>
            </v-card>

            <message-component
                v-model="showConfirmacaoSaida"
                title="Sair"
                message="Deseja realmente sair do sistema?"
                confirm-text="Sim, sair"
                cancel-text="Cancelar"
                confirm-color="error"
                @confirm="sair"
            />
        </v-menu>
    </v-navigation-drawer>

    <v-app-bar>
        <template #prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer" />
        </template>

        <v-app-bar-title class="title-bar">
            <v-breadcrumbs :items="$route.meta.breadcrumbs">
                <template #divider>
                    <v-icon icon="mdi-chevron-right" />
                </template>
            </v-breadcrumbs>
        </v-app-bar-title>

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
        </template>
    </v-app-bar>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import MessageComponent from './MessageComponent.vue';

    export interface TitleHeader {
        title: string
        disabled: boolean
        href?: string
    }

    export default defineComponent({
        name: 'HeaderComponent',

        components: {
            MessageComponent
        },

        props: {
            breadcrumbs: {
                type: Array as PropType<TitleHeader[]>,
                default: () => [],
            },
        },

        data () {
            return {
                drawer: true,

                user: 'Oliveto',

                profile: 'Administrador',

                pesquisaMenu: '',

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

                menus: [
                    {
                        title: 'Home',
                        icon: 'mdi-home-variant-outline',
                        to: '/',
                    },

                    {
                        title: 'Perfis',
                        icon: 'mdi-account-circle',
                        children: [
                            {
                                title: 'Pessoas',
                                icon: 'mdi-account-group-outline',
                                to: '/pessoas',
                            },
                            {
                                title: 'Usuários',
                                icon: 'mdi-account-edit-outline',
                                to: '/usuarios',
                            },
                        ],
                    },

                    {
                        title: 'Acervo',
                        icon: 'mdi-bookmark-box-multiple',
                        children: [
                            {
                                title: 'Livros',
                                icon: 'mdi-book',
                                to: '/livros',
                            },
                            {
                                title: 'Autores',
                                icon: 'mdi-fountain-pen-tip',
                                to: '/autores',
                            },
                            {
                                title: 'Categorias',
                                icon: 'mdi-content-duplicate',
                                to: '/categorias',
                            },
                            {
                                title: 'Editoras',
                                icon: 'mdi-newspaper-variant-outline',
                                to: '/editoras',
                            },
                            {
                                title: 'Exemplares',
                                icon: 'mdi-book-multiple-outline',
                                to: '/exemplares',
                            },
                        ],
                    },

                    {
                        title: 'Circulação',
                        icon: 'mdi-sync',
                        children: [
                            {
                                title: 'Empréstimos',
                                icon: 'mdi-arrow-u-right-top-bold',
                                to: '/emprestimos',
                            },
                            {
                                title: 'Devoluções',
                                icon: 'mdi-arrow-u-left-top-bold',
                                to: '/devolucoes',
                            },
                            {
                                title: 'Reservas',
                                icon: 'mdi-bookmark-check-outline',
                                to: '/reservas',
                            },
                        ],
                    },

                    {
                        title: 'Controle',
                        icon: 'mdi-camera-control',
                        children: [
                            {
                                title: 'Atrasados',
                                icon: 'mdi-clock-alert-outline',
                                to: '/atrasados',
                            },
                            {
                                title: 'Multas',
                                icon: 'mdi-cash-minus',
                                to: '/multas',
                            },
                            {
                                title: 'Histórico',
                                icon: 'mdi-history',
                                to: '/historico',
                            },
                        ],
                    },

                    {
                        title: 'Relatórios',
                        icon: 'mdi-chart-box-outline',
                        to: '/relatorios',
                    },
                ],

                showConfirmacaoSaida: false
            }
        },

        methods: {
            selecionarEmpresa (empresa: any) {
                this.empresaSelecionada = empresa
                this.menuAberto = false
            },

            confirmarSaida() {
                this.showConfirmacaoSaida = true
            },

            sair() {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        },

        computed: {
            menusFiltrados () {
                const pesquisa = this.pesquisaMenu.trim().toLowerCase()

                if (!pesquisa) {
                    return this.menus
                }

                return this.menus
                    .map((menu: any) => {
                        if (menu.children) {
                            const menuEncontrado = menu.title.toLowerCase().includes(pesquisa)

                            const filhosEncontrados = menu.children.filter((item: any) =>
                                item.title.toLowerCase().includes(pesquisa),
                            )

                            if (menuEncontrado) {
                                return menu
                            }

                            if (filhosEncontrados.length) {
                                return {
                                    ...menu,
                                    children: filhosEncontrados,
                                }
                            }

                            return null
                        }

                        return menu.title.toLowerCase().includes(pesquisa) ? menu : null
                    })
                    .filter(Boolean)
            },
        },
    })
</script>

<style scoped>
    .title-bar {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.8px;
    }

    :deep(.v-navigation-drawer__content) {
        display: flex;
        flex-direction: column;
    }

    .usuario-sidebar {
        margin-bottom: 16px;
    }

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
        color: #c3c5c9;
    }

    .empresa-cnpj {
        font-size: 12px;
        color: #c3c5c9;
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

    .pesquisa-sidebar {
        padding: 8px 10px 10px;
    }

    .pesquisa-sidebar :deep(.v-field) {
        background-color: rgba(255, 255, 255, 0.08);
        color: white;
    }

    .pesquisa-sidebar :deep(.v-field__input) {
        color: white;
    }

    .pesquisa-sidebar :deep(input::placeholder) {
        color: rgba(255, 255, 255, 0.5);
    }
</style>
