<template>
  <div class="row">
    <div class="col-12 col-md-4">
      Jiji
    </div>

    <div class="col-12 col-md-8">
      <q-card class="q-pa-md q-ma-md">
        <q-card-section>{{ aboutMe }}</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { validateToken } from '../utils/security.js'

  const aboutMe = ref(null)

  onMounted(() => {
    aboutMe.value = validateToken().aboutMe
  })
</script>
