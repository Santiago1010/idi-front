<template>
  <div>
    <q-toolbar>
      <span class="text-body2">&copy; {{ new Date().getFullYear() }} IDI, Tim.</span>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">{{ $t('footer.privacy') }}</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">{{ $t('footer.terms') }}</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">{{ $t('footer.siteMap') }}</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">{{ $t('footer.companyData') }}</router-link>

      <q-space />

      <q-btn flat icon-right="expand_less" @click="dialogFooter = true" :label="$t('footer.assitanceResources')"></q-btn>
    </q-toolbar>

    <q-dialog v-model="dialogFooter" position="bottom">
      <q-card class="footer-card">
        <q-icon class="icon_close" name="close" @click="dialogFooter = false" />

        <div class="row q-mx-xl">
          <div class="col-12 col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">{{ $t('footer.assitance.label') }}</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">{{ $t('footer.community.label') }}</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">{{ $t('footer.aboutPlatform.label') }}</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">{{ $t('footer.idi.label') }}</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar stores
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Importar intenacionalización
  import messages from '@intlify/unplugin-vue-i18n/messages'

  // Variables y constantes del componente
  const dialogFooter = ref(false)
  const utilsStore = useUtilsStore()

  const assitances = ref([
    {
      to: '/',
      label: messages[utilsStore.language].footer.assitance.links.helpCenter.source,
    },
    {
      to: '/',
      label: messages[utilsStore.language].footer.assitance.links.discapacity.source
    },
    {
      to: '/',
      label: 'Opciones de cancelación'
    },
    {
      to: '/',
      label: 'Denunciar algún fraude'
    }
  ])
</script>

<style scoped>
  .footer-titles {
    font-size: 1.8rem;
    margin-bottom: -1%;
    font-family: 'Work Sans';
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 1.4rem;
  }

  ul li {
    margin-left: 2%;
  }

  .icon_close {
    position: absolute;
    top: 3%;
    left: 0.8%;
    cursor: pointer;
    font-size: 2rem;
  }

  .footer-card {
    position: absolute;
    min-width: 98.5vw;
    min-height: 50vh;
    bottom: 0%;
  }
</style>
