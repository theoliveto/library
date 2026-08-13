import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/pages/index.vue'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Index },
    { path: '/autores', component: Autores },
    { path: '/categorias', component: Categorias },
    { path: '/editoras', component: Editoras },
    { path: '/exemplares', component: Exemplares },
    { path: '/livros', component: Livros },
    { path: '/devolucoes', component: Devolucoes },
    { path: '/emprestimos', component: Emprestimos },
    { path: '/reservas', component: Reservas },
    { path: '/atrasados', component: Atrasados },
    { path: '/historico', component: Historico },
    { path: '/multas', component: Multas },
    { path: '/pessoas', component: Pessoas },
    { path: '/usuarios', component: Usuarios },
    { path: '/relatorios', component: Relatorios },
  ],
})

export default router
