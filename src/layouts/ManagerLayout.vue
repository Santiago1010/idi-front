<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab :to="`/${code}/projects`" label="Proyectos" />
        <q-route-tab :to="`/${code}/page2`" label="Page Two" />
        <q-route-tab :to="`/${code}/page3`" :label="`${code}`" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="row q-mx-xl q-my-md">
        <div class="col-12 col-md-4 text-center">
          <SummaryUser :code="code" :fullName="fullName" />
        </div>

        <div class="col-12 col-md-8">
          <router-view />
        </div>
      </div>
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
  // Importar vue
  import { ref, onMounted } from 'vue'

  // Importar componentes
  import SummaryUser from '../components/SummaryUser.vue'

  // Importar útiles
  import { validateToken } from '../utils/security.js'

  // Constantes y variables
  const usersData = ref(null)
  const code = ref(null)
  const fullName = ref(null)

  // Funciones y métodos
  onMounted(() => {
    usersData.value = validateToken()
    code.value = usersData.value.code
    fullName.value = usersData.value.fullName
  })
</script>
