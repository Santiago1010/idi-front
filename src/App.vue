<template>
  <router-view />
</template>

<script setup>
  // Importar internos de vue
  import { onMounted } from 'vue'

  onMounted(() => {
    if (!localStorage.language) {
      languageStore.setNewLanguage(navigator.language.split('-')[0])
    }
  })
</script>
