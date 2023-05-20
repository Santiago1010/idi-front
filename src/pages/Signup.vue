<template>
  <q-card class="q-ma-md q-pa-md">
    <q-tabs v-model="typeUser">
      <q-tab name="user" label="Usuario" />
      <q-tab name="institution" label="Institución" />
    </q-tabs>
  </q-card>
</template>

<script setup>
  // Importar internos de vue
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Constantes y variables de configuración de la página
  const $route = useRoute()
  const $router = useRouter()

  // Constantes y variables de la página
  const typeUser = ref('user')

  onMounted(() => {
    if ($route.params.type && $route.params.type === 'user' || $route.params.type === 'institution') {
      typeUser.value = $route.params.type
    } else {
      $router.push('/404')
    }
  })
</script>
