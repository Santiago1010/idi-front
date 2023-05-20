<template>
  <q-btn color="secondary" :label="$t('changeLanguage')">
    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <q-item v-for="(language, index) in languages" @click="changeLanguage(index)" clickable>
          <q-item-section>{{ language }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
// Importar internos de vue
import { ref } from 'vue';
import { useLocaleSwitcher } from '../composable/use-locale-switcher.js';

const localeSwitcher = useLocaleSwitcher();

// Constantes y variables del componente
const languages = ref({
  'de': '🇩🇪 Deutsch',
  'en-GB': '🇬🇧 English',
  'es': '🇪🇸 Español',
  'ja': '🇯🇵 日本語',
  'pt': '🇵🇹 Português',
  'ru': '🇷🇺 Русский',
  // 'zh-CN': '🇨🇳 中文',
});


// Funciones y métodos
function changeLanguage(newLanguage) {
  localeSwitcher.setLocale(newLanguage);
}
</script>
