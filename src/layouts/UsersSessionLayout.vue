<template>
  <q-layout view="hhh lpR lff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
        <q-btn flat round dense icon="search" />
        <q-btn flat to="/user">inicio</q-btn>
        <q-btn flat to="/user">estadísticas</q-btn>
        <q-btn flat to="/user">explorar</q-btn>

        <q-space></q-space>

        <q-btn round color="white">
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>
                    <p class="text-body2">Tu código:</p>
                    {{ code }}
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item v-for="you in yours" :key="you.id" clickable>
                  <q-item-section @click="goTo(you.url)">{{ you.name }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item v-for="util in utils" :key="util.id" clickable>
                  <q-item-section @click="goTo(util.url)">{{ util.name }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click="closeSession">Cerrar sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!--<q-drawer show-if-above side="left" bordered></q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { validateToken } from '../utils/security.js'

  import { useSessionStore } from '../stores/SessionStore.js'

  const $router = useRouter()

  const code = ref(null)
  const yours = ref(null)
  const utils = ref(null)

  const sessionStore = useSessionStore()

  // Funciones
  const goTo = (url) => {
    $router.push(url)
  }

  const closeSession = () => {
    sessionStore.jwt = null
    localStorage.removeItem('jwt')

    $router.push('/')
  }

  onMounted(() => {
    code.value = validateToken().code

    yours.value = [
      {
        id: 1,
        name: 'Tu perfil',
        url: `/user/${code.value}`
      },
      {
        id: 2,
        name: 'Tus publicaciones',
        url: `/user/publications/${code.value}`
      },
      {
        id: 3,
        name: 'Tus proyectos',
        url: `/${code.value}/projects`
      },
      {
        id: 4,
        name: 'Tus organizaciones',
        url: `/user/organisations/${code.value}`
      },
      {
        id: 5,
        name: 'Tus equipos',
        url: `/user/teams/${code.value}`
      }
    ]
    utils.value = [
      {
        id: 1,
        name: 'Ayuda',
        url: '/help'
      },
      {
        id: 2,
        name: 'Configuración',
        url: `/user/settigns/${code.value}`
      }
    ]
  })
</script>
