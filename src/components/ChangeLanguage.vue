<template>
  <!--<select v-model="$i18n.locale" label="Cambiar idioma">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
  </select>-->
  <div class="dropdown" :class="{ active: dropdownActive }" @click="dropdownActive = !dropdownActive">
    <input type="text" class="textBox" :placeholder="$t('changeLanguage')" readonly>

    <div class="options">
      <div v-for="language in optionsLanguages" :key="language.language" @click="$i18n.locale = language.locale"><span :class="`fi fi-${language.class}`"></span> {{ language.language }}</div>
    </div>
  </div>
</template>

<script setup>
  // Importar internos de vue
  import { ref, onMounted } from 'vue'

  // Importar store
  import { useLanguageStore } from '../stores/LanguageStore.js'

  const languageStore = useLanguageStore()

  // Constantes y variables del componente
  const optionsLanguages = ref([
    {
      locale: 'de',
      language: 'Deutsch',
      class: 'de'
    },
    {
      locale: 'en',
      language: 'English',
      class: 'us'
    },
    {
      locale: 'es',
      language: 'Español',
      class: 'co'
    },
    {
      locale: 'fr',
      language: 'Français',
      class: 'fr'
    },
    {
      locale: 'it',
      language: 'Italiano',
      class: 'it'
    },
    {
      locale: 'pt',
      language: 'Português',
      class: 'pt'
    }
  ]);
  const dropdownActive = ref(false)
</script>

<style scoped>
  .dropdown {
    position: relative;
    margin: 1% 0;
    width: 300px;
    height: 50px;
  }

  .dropdown::before {
    content: '';
    position: absolute;
    right: 20px;
    top: 18px;
    z-index: 1000;
    width: 8px;
    height: 8px;
    border: 2px solid black;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(-45deg);
    transition: 0.5s;
    pointer-events: none;
  }

  .dropdown input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: #FFFFFF;
    border: none;
    outline: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    padding: 12px 20px;
    border-radius: 10px;
    text-transform: uppercase;
  }

  .dropdown.active::before {
    top: 22px;
    transform: rotate(-225deg);
  }

  .dropdown .options {
    position: absolute;
    top: 70px;
    width: 50%;
    margin-left: 25%;
    background: #FFFFFF;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
    color: #333333;
    display: none;
  }

  .dropdown.active .options {
    display: block;
  }

  .dropdown .options div {
    padding: 12px 20px;
    cursor: pointer;
  }

  .dropdown .options div:hover {
    background-color: #D3D3D3;
  }

  .dropdown .options div span.fi {
    position: relative;
    top: 1px;
    font-size: 1.2em;
  }
</style>
