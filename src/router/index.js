import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    component: () => import('@/views/estudiante/EstudiantesTablaView.vue')
  },
  {
    path:'/estudiante-formulario',
    name: 'estudiante-formulario',
    component: () => import('@/views/estudiante/EstudianteFormularioView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
