<template>
  <router-view />
</template>

<script setup>
  // Importar internos de vue
  import { onMounted } from 'vue'

  // Importar store
  import { useLanguageStore } from './stores/LanguageStore.js'

  const languageStore = useLanguageStore()

  onMounted(() => {
    /*if (!localStorage.language) {
      languageStore.setNewLanguage(navigator.language.split('-')[0])
    }*/
  })
</script>
