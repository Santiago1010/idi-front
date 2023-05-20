<template>
  <q-card class="q-ma-md">
    <q-tabs v-model="typeUser">
      <q-tab name="user" label="Usuario" @click="usersTypeChange('user')" />
      <q-tab name="institution" label="Institución" @click="usersTypeChange('institution')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="typeUser" animated>
      <q-tab-panel name="user">
        <SignupUser />
      </q-tab-panel>

      <q-tab-panel name="institution"></q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  // Importar internos de vue
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Importar componentes
  import SignupUser from '../components/SignupUser.vue'

  // Constantes y variables de configuración de la página
  const $route = useRoute()
  const $router = useRouter()

  // Constantes y variables de la página
  const typeUser = ref('user')

  const usersTypeChange = (type) => {
    $router.push(`/signup/${type}`)
  }

  onMounted(() => {
    if ($route.params.type && $route.params.type === 'user' || $route.params.type === 'institution') {
      typeUser.value = $route.params.type
    } else {
      $router.push('/404')
    }
  })
</script>
