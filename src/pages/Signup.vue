<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2 class="text-h2 text-bold text-center">{{ $t('links.signup.label.title') }}</h2>

      <p class="text-body1">{{ $t('links.signup.label.description') }}</p>
    </q-card-section>

    <SignupUser />
  </q-card>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar componentes
  import SignupUser from '../components/SignupUser.vue'
</script>
