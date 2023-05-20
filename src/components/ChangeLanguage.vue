<template>
  <q-btn color="secondary" :label="$t('changeLanguage')">
    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <q-item v-for="(language, index) in languages" @click="changelanguage(index)" clickable>
          <q-item-section>{{ language }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar store
  import { useLanguageStore } from '../stores/LanguageStore.js'

  const languageStore = useLanguageStore()

  // Constantes y variables del componente
  const languages = ref({
    'de': '🇩🇪 Deutsch',
    'en': '🇬🇧 English',
    'es': '🇪🇸 Español',
    'ja': '🇯🇵 日本語',
    'pt': '🇵🇹 Português',
    'ru': '🇷🇺 Русский',
    'zh': '🇨🇳 中文'
  });

  // Funciones y métodos
  const changelanguage = (newLanguage) => {
    console.clear()
    localStorage.removeItem('language');

    if (!localStorage.language) {
      languageStore.setNewLanguage({ newLanguage })
    }
  }
</script>
