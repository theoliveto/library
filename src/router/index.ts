import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
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
      meta: { title: 'Library | Login' },
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
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.autenticado) {
    return '/login'
  }

  return true
})

export default router
