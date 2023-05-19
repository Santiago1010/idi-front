<template>
  <router-view />
</template>

<script setup>
  // Importar internos de vue
  import { onMounted } from 'vue'

  // Métodos y funciones
  const setLanguage = () => {
    if (!localStorage.language) {
      let language = navigator.language.split('-')[0]
      localStorage.setItem('langauge', language)
    }
  }

  onMounted(() => {
    setLanguage()
  })
</script>
