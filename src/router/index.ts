import { createRouter, createWebHistory } from 'vue-router'

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
      breadcrumbs?: TitleHeader[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
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
        title: 'Library | Configurações',
        breadcrumbs: [
          { title: 'Home', disabled: false, href: '/' },
          { title: 'Configurações', disabled: true },
        ],
      },
    },
  ],
})

export default router
