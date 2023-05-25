<template>
  <q-card class="q-ma-xl q-pa-md">
    JIjijijij
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Contantes de la página
  const $router = ref(null)
  const $route = ref(null)
  const reason = ref(null)
  const type = ref(null)
  const token = ref(null)

  // Funciones de la página
  onMounted(() => {
    reason.value = $route.params.reason
    type.value = $route.params.type
    token.value = $route.params.token
  })
</script>
