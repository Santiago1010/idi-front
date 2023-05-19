import { createRouter, createWebHistory } from 'vue-router'

// Importar layouts
import MainLayout from '../../../layouts/MainLayout.vue'
import SessionLayout from '../../../layouts/SessionLayout.vue'

// Importar páginas
import Index from '../../../pages/Index.vue'
import Login from '../../../pages/Login.vue'
import Home from '../../../pages/Home.vue'
import Signup from '../../../pages/Signup.vue'
import ConfirmAccount from '../../../pages/ConfirmAccount.vue'
import AboutUs from '../../../pages/AboutUs.vue'
import RecoverPassword from '../../../pages/RecoverPassword.vue'

import Campaigns from '../../../pages/Campaigns.vue'
import History from '../../../pages/History.vue'
import Account from '../../../pages/Account.vue'

import Campaign from '../../../pages/Campaign.vue'

import NotFound from '../../../pages/NotFound.vue'

import { useSessionStore } from '../stores/SessionStore.js'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: Index
      },
    ],
  },
  {
    path: '/',
    component: SessionLayout,
    children: [
    ],
    /*beforeEnter: (to, from, next) => {
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
    }*/
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
