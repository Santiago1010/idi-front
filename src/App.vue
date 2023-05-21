<template>
  <router-view />
</template>

<script setup>
  // Importar internos de vue
  import { onMounted } from 'vue'

  // Importar tiendas
  import { useUtilsStore } from './stores/UtilsStore.js'

  // Constantes y variables del componente
  const utilsSotre = useUtilsStore()

  onMounted(() => {
    if (!localStorage.language) {
      utilsSotre.setNewLanguage(navigator.language.split('-')[0])
    }
  })
</script>
