<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2 class="text-h2 text-center">{{ $t('links.recover.title') }}</h2>

      <p class="text-body1">{{ $t('links.recover.description') }}</p>
    </q-card-section>

    <q-form @submit.prevent="sendRecoverPasswordEmail">
      <q-card-section>
        <q-input v-model="email" type="text" class="q-my-md" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')">
          <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn type="submit" color="primary" label="recuperar contraseña" class="long-btn"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { publicRoutes } from '../utils/axios.js'

  // Importar sotres
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Importar componentes
  import LoaderPage from '../components/LoaderPage.vue'

  // Constantes y variables de la página.
  const utilsStore = useUtilsStore()
  const $router = useRouter()
  const $route = useRoute()

  // Modelos
  const email = ref(null)

  // Funciones y métodos.
  const sendRecoverPasswordEmail = () => {
    utilsStore.setNewLoadersState(true)

    publicRoutes.recoverPassword($route.params.type, email.value).then(response => {
      console.clear()
      console.log(response.data)
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    })
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
