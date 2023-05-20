<template>
  <select v-model="$i18n.locale" label="Cambiar idioma">
    <option :value="$t('changeLanguage')" default>{{ $t('changeLanguage') }}</option>
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
  </select>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar store
  import { useLanguageStore } from '../stores/LanguageStore.js'

  const languageStore = useLanguageStore()

  // Constantes y variables del componente
  const optionsLanguages = ref([
    {
      locale: 'de',
      language: 'Deutsch',
      class: ''
    },
    {
      locale: 'en',
      language: 'English',
      class: ''
    },
    {
      locale: 'es',
      language: 'Español',
      class: ''
    },
    {
      locale: 'fr',
      language: 'Français',
      class: ''
    },
    {
      locale: 'it',
      language: 'Italiano',
      class: ''
    },
    {
      locale: 'pt',
      language: 'Português',
      class: ''
    }
  ]);

  // Funciones y métodos
  const changelanguage = (newLanguage) => {
    localStorage.removeItem('language');

    if (!localStorage.language) {
      languageStore.setNewLanguage({ newLanguage })
    }
  }
</script>
