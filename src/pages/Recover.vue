<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2 class="text-h2 text-center">{{ $t('links.recover.title') }}</h2>

      <p class="text-body1">{{ $t('links.recover.description') }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Constantes y variables de la página.
  const $router = useRouter()
  const $route = useRoute()

  onMounted(() => {
    console.clear()

    if ($route.params.type !== 'user' && $route.params.type !== 'institution') {
      $router.push('/404')
    }
  })
</script>

<style scoped>
  .text-h2 {
    font-family: 'Work Sans', Arial;
    text-transform: capitalize;
    font-weight: bold;
  }
</style>
