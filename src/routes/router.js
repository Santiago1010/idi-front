import { createRouter, createWebHistory } from 'vue-router'

// Importar layouts
import MainLayout from '../layouts/MainLayout.vue'
//import SessionLayout from '../layouts/SessionLayout.vue'

// Importar páginas
import Index from '../pages/Index.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'

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
      }
    ],
  },
  /*{
    path: '/',
    component: SessionLayout,
    children: [
    ],
    beforeEnter: (to, from, next) => {
      const sessionStore = useSessionStore()

      if (sessionStorage.jwt) {
        sessionStore.validJWT(sessionStorage.jwt)

        if (sessionStore.verify) {
          next();
        } else {
          next({path: '/login'});
        }
      } else {
        sessionStorage.clear()
        sessionStore.clear()
        next({path: '/login'});
      }
    }
  },*/
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
