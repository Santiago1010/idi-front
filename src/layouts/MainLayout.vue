<template>
  <q-layout view="hhh lpR fff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          {{ $t('info.platform.name') }}<span class="desktop-only">: {{ $t('info.platform.lastName') }}</span>
        </q-toolbar-title>

        <ChangeLanguage />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white q-px-sm">
      <Footer />
    </q-footer>

  </q-layout>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar componentes
  import ChangeLanguage from '../components/ChangeLanguage.vue'
  import Footer from '../components/Footer.vue'

  // Variables y constantes del layout
  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
</script>
