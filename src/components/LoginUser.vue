<template>
  <q-card-section>
    <q-form @submit.prevent="loginUser">
      <q-card-section>
        <q-input v-model="loginData.identifier" type="text" class="q-my-md" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')">
          <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input v-model="loginData.password" :type="showPassword ? 'text' : 'password'" class="q-my-md" outlined :label="$t('inputs.user.password.label')" :hint="$t('inputs.user.password.hint')" counter>
          <q-tooltip>{{ $t('inputs.user.password.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="password" />
          </template>

          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
          </template>
        </q-input>

        <router-link to="/recover-password/user">{{ $t('links.recover.label.principal') }}</router-link>
      </q-card-section>

      <q-card-actions vertical>
        <q-btn type="submit" :label="$t('links.login.label.principal')" color="info" class="q-mb-sm long-btn" icon-right="login">
          <q-tooltip>{{ $t('login.butttonTooltip') }}</q-tooltip>
        </q-btn>

        <q-btn flat type="button" to="/signup" :label="$t('links.signup.label.alternative')" class="q-mt-xl long-btn"></q-btn>
      </q-card-actions>
    </q-form>

    <LoaderPage />
  </q-card-section>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useQuasar } from 'quasar'
  import { publicRoutes } from '../utils/axios.js'
  import { setNewPassword, validateToken } from '../utils/security.js'

  // Importar sotres
  import { useUtilsStore } from '../stores/UtilsStore.js'
  import { useSessionStore } from '../stores/SessionStore.js'

  // Importar componentes
  import LoaderPage from '../components/LoaderPage.vue'

  // Constantes y variables de la página.
  const $q = useQuasar()
  const $router = useRouter()

  const utilsStore = useUtilsStore()
  const sessionStore = useSessionStore()
  const showPassword = ref(false)

  const loginData = ref({
    identifier: null,
    password: null
  })

  // Funciones y métodos
  const loginUser = () => {
    console.clear()

    utilsStore.setNewLoadersState(true)

    const usersLoginData = {
      identifier: loginData.value.identifier,
      password: null
    }

    usersLoginData.password = setNewPassword(loginData.value.password)

    publicRoutes.login('user', usersLoginData).then(response => {
      console.log(response.data)
      $q.notify({
        icon: response.data.status === 'success' ? 'check' : 'warning',
        color: response.data.status === 'success' ? 'green-5' : 'red-5',
        message: response.data.message
      })

      if (response.data.data.token) {
        sessionStore.setNewToken(response.data.data.token)
        $router.push('/user')
      } else {
        $q.notify({
          icon: 'warning',
          color: 'red-5',
          message: 'El token es inválido'
        })

        console.error(response.data)
      }

      loginData.value.password = null
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    })
  }
</script>
