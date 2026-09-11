import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Index from '@/pages/index.vue'
import Login from '@/pages/autenticacao/login.vue'
import Autores from '@/pages/acervo/autores.vue'
import Categorias from '@/pages/acervo/categorias.vue'
import Editoras from '@/pages/acervo/editoras.vue'
import Exemplares from '@/pages/acervo/exemplares.vue'
import Livros from '@/pages/acervo/livros.vue'
import Devolucoes from '@/pages/circulacao/devolucoes.vue'
import Emprestimos from '@/pages/circulacao/emprestimos.vue'
import Reservas from '@/pages/circulacao/reservas.vue'
import Atrasados from '@/pages/controle/atrasados.vue'
import Historico from '@/pages/controle/historico.vue'
import Multas from '@/pages/controle/multas.vue'
import Pessoas from '@/pages/perfis/pessoas.vue'
import Usuarios from '@/pages/perfis/usuarios.vue'
import Relatorios from '@/pages/relatorios.vue'
import Configuracoes from '@/pages/configuracoes.vue'
import Perfil from '@/pages/perfil.vue'
import ResetPassword from '@/pages/autenticacao/reset-password.vue'
import ForgotPassword from '@/pages/autenticacao/forgot-password.vue'

export interface TitleHeader {
  title: string
  disabled: boolean
  href?: string
}

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs?: TitleHeader[],
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        requiresAuth: true,
        title: 'Library | Dashboard',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Dashboard', disabled: true },
        ],
      },
    },
    {
      path: '/login',
      component: Login,
      meta: { 
        requiresAuth: false,
        title: 'Library | Login' 
      },
    },
    {
      path: '/autores',
      component: Autores,
      meta: {
        requiresAuth: true,
        title: 'Library | Autores',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Acervo', disabled: true },
          { title: 'Autores', disabled: true },
        ],
        table: {
          title: 'Autores',
          icon: 'mdi-fountain-pen-tip',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/categorias',
      component: Categorias,
      meta: {
        requiresAuth: true,
        title: 'Library | Categorias',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Acervo', disabled: true },
          { title: 'Categorias', disabled: true },
        ],
        table: {
          title: 'Categorias',
          icon: 'mdi-content-duplicate',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/editoras',
      component: Editoras,
      meta: {
        requiresAuth: true,
        title: 'Library | Editoras',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Acervo', disabled: true },
          { title: 'Editoras', disabled: true },
        ],
        table: {
          title: 'Editoras',
          icon: 'mdi-newspaper-variant-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/exemplares',
      component: Exemplares,
      meta: {
        requiresAuth: true,
        title: 'Library | Exemplares',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Acervo', disabled: true },
          { title: 'Exemplares', disabled: true },
        ],
        table: {
          title: 'Exemplares',
          icon: 'mdi-book-multiple-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/livros',
      component: Livros,
      meta: {
        requiresAuth: true,
        title: 'Library | Livros',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Acervo', disabled: true },
          { title: 'Livros', disabled: true },
        ],
        table: {
          title: 'Livros',
          icon: 'mdi-book',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/devolucoes',
      component: Devolucoes,
      meta: {
        requiresAuth: true,
        title: 'Library | Devoluções',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Circulação', disabled: true },
          { title: 'Devoluções', disabled: true },
        ],
        table: {
          title: 'Devoluções',
          icon: 'mdi-arrow-u-left-top-bold',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/emprestimos',
      component: Emprestimos,
      meta: {
        requiresAuth: true,
        title: 'Library | Empréstimos',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Circulação', disabled: true },
          { title: 'Empréstimos', disabled: true },
        ],
        table: {
          title: 'Empréstimos',
          icon: 'mdi-arrow-u-right-top-bold',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/reservas',
      component: Reservas,
      meta: {
        requiresAuth: true,
        title: 'Library | Reservas',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Circulação', disabled: true },
          { title: 'Reservas', disabled: true },
        ],
        table: {
          title: 'Reservas',
          icon: 'mdi-bookmark-check-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/atrasados',
      component: Atrasados,
      meta: {
        requiresAuth: true,
        title: 'Library | Atrasados',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Controle', disabled: true },
          { title: 'Atrasados', disabled: true },
        ],
        table: {
          title: 'Atrasados',
          icon: 'mdi-clock-alert-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/historico',
      component: Historico,
      meta: {
        requiresAuth: true,
        title: 'Library | Histórico',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Controle', disabled: true },
          { title: 'Atrasados', disabled: true },
        ],
        table: {
          title: 'Histórico',
          icon: 'mdi-history',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/multas',
      component: Multas,
      meta: {
        requiresAuth: true,
        title: 'Library | Multas',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Controle', disabled: true },
          { title: 'Multas', disabled: true },
        ],
        table: {
          title: 'Multas',
          icon: 'mdi-cash-minus',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/pessoas',
      component: Pessoas,
      meta: {
        requiresAuth: true,
        title: 'Library | Pessoas',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Perfis', disabled: true },
          { title: 'Pessoas', disabled: true },
        ],
        table: {
          title: 'Pessoas',
          icon: 'mdi-account-group-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/usuarios',
      component: Usuarios,
      meta: {
        requiresAuth: true,
        title: 'Library | Usuários',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Perfis', disabled: true },
          { title: 'Usuários', disabled: true },
        ],
        table: {
          title: 'Usuários',
          icon: 'mdi-account-edit-outline',
          itemKey: 'id'
        }
      },
    },
    {
      path: '/relatorios',
      component: Relatorios,
      meta: {
        requiresAuth: true,
        title: 'Library | Relatórios',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Relatórios', disabled: true },
        ],
      },
    },
    {
      path: '/perfil',
      component: Perfil,
      meta: {
        requiresAuth: true,
        title: 'Library | Perfil',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Perfil', disabled: true },
        ],
      },
    },
    {
      path: '/configuracoes',
      component: Configuracoes,
      meta: {
        requiresAuth: true,
        title: 'Library | Configurações',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Configurações', disabled: true },
        ],
      },
    },
    {
      path: '/reset-password',
      component: ResetPassword,
      meta: {
        title: 'Library | Redefinir Senha',
      },
    },
    {
      path: '/forgot-password',
      component: ForgotPassword,
      meta: {
        title: 'Library | Esqueci minha Senha',
      },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.autenticado) {
    return '/login'
  }

  if (to.path === '/login' && authStore.autenticado) {
    return '/'
  }

  return true
})

export default router
