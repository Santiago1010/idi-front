import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from '../utils/security.js'

// Importar layouts
import MainLayout from '../layouts/MainLayout.vue'
import UsersSessionLayout from '../layouts/UsersSessionLayout.vue'

// Importar páginas
import Index from '../pages/Index.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Recover from '../pages/Recover.vue'
import RecoverConfirm from '../pages/RecoverConfirm.vue'

import Home from '../pages/Home.vue'
import UsersProfile from '../pages/UsersProfile.vue'

import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/login/:type',
        component: Login
      },
      {
        path: '/signup',
        component: Signup
      },
      {
        path: '/recover-password/:type',
        component: Recover
      },
      {
        path: '/:reason/:type/:token',
        component: RecoverConfirm
      }
    ],
  },
  {
    path: '/user',
    component: UsersSessionLayout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: ':code',
        component: UsersProfile
      }
    ],
    beforeEnter: (to, from, next) => {
      let data = validateToken()

      if (!data) {
        localStorage.removeItem('jwt')
        next({path: '/login/user'})
        return false
      }

      if (data.rol == 2) {
        localStorage.removeItem('jwt')
        next({path: '/login/institution'})
        return false
      }

      next();
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    name: 'bad-not-found',
    component: NotFound
  },
];

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router;
