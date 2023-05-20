<template>
  <q-card class="q-ma-md q-pa-md">
    <q-form @submit.prevent="loginUser">
      <q-card-section class="text-h2">{{ $t('links.login.label.principal') }}</q-card-section>

      <q-card-section>
        <q-input v-model="loginData.email" type="text" class="q-my-md" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')">
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

        <router-link to="/">{{ $t('links.recover.label.principal') }}</router-link>
      </q-card-section>

      <q-card-actions>
        <q-btn type="submit" :label="$t('links.login.label.principal')" color="info" class="long-btn" icon-right="login">
          <q-tooltip>{{ $t('login.butttonTooltip') }}</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-form>
    <LoaderPage />
  </q-card>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref } from 'vue'

  //Importar stores de pinia
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Importar componentes
  import LoaderPage from '../components/LoaderPage.vue'

  // Constantes y variables del componente.
  const utilsStore = useUtilsStore()

  // Constantes y variables de la página.
  const showPassword = ref(false)

  const loginData = ref({
    email: null,
    password: null
  })

  // Funciones y métodos
  const loginUser = () => {
    //utilsStore.setNewLoadersState(true)

    /*loginUser(loginData.value).then(response => {
      //
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    })*/
  }
</script>
