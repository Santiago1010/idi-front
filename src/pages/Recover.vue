<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2 class="text-h2 text-center">{{ $t('links.recover.title') }}</h2>

      <p class="text-body1">{{ $t('links.recover.description') }}</p>
    </q-card-section>

    <q-form @submit.prevent="sendRecoverPasswordEmail" ref="recoverPaswordsForm">
      <q-card-section>
        <q-input v-model="email" type="text" class="q-my-md" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')">
          <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn type="submit" color="primary" :label="$t('links.recover.title')" class="long-btn"></q-btn>
      </q-card-actions>

      <q-card-actions vertical>
        <q-btn flat type="submit" :to="`/login/${$route.params.type}`" :label="$t('links.login.label.alternative')" class="long-btn"></q-btn>

        <q-btn v-if="$route.params.type === 'user'" flat type="submit" to="/signup" :label="$t('links.signup.label.alternative')" class="long-btn"></q-btn>
      </q-card-actions>
    </q-form>

    <LoaderPage />
  </q-card>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'
  import { publicRoutes } from '../utils/axios.js'

  // Importar sotres
  import { useUtilsStore } from '../stores/UtilsStore.js'
  import { useRegexStore } from '../stores/RegexStore.js'
  import { useRulesStore } from '../stores/RulesStore.js'

  // Importar plugins
  import { i18n } from '../utils/i18n.js'

  // Importar componentes
  import LoaderPage from '../components/LoaderPage.vue'

  // Constantes y variables de la página.
  const $q = useQuasar()
  const { t: translate } = i18n.global
  const $router = useRouter()
  const $route = useRoute()

  const utilsStore = useUtilsStore()

  // Modelos
  const recoverPaswordsForm = ref()
  const email = ref(null)

  // Funciones y métodos.
  const sendRecoverPasswordEmail = () => {
    console.clear()

    if (email.value !== null && email.value !== undefined) {
      utilsStore.setNewLoadersState(true)

      publicRoutes.recoverPasswordEmail($route.params.type, email.value).then(response => {
        $q.notify({
          color: response.data.status === 'success' ? 'green-5' : 'red-5',
          icon: response.data.status === 'success' ? 'check' : 'warning',
          message: response.data.message
        })

        email.value = response.data.status === 'success' ? null : email.value
        recoverPaswordsForm.value.resetValidation()
      }).catch(error => console.error(error)).then(() => {
        utilsStore.setNewLoadersState(false)
      })
    }
  }

  onMounted(() => {
    console.clear()

    if ($route.params.type !== 'user' && $route.params.type !== 'institution') {
      $router.push('/404')
    }
  })
</script>

<style scoped>
  .text-h2 {
    font-family: 'Work Sans', Arial;
    text-transform: capitalize;
    font-weight: bold;
  }
</style>
