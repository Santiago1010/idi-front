<template>
  <q-card class="q-ma-md">
    <q-tabs v-model="type" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="user" :label="$t('inputs.user.label')" @click="changeTypeLogin('user')" />
      <q-tab name="institution" :label="$t('inputs.institution.label')" @click="changeTypeLogin('institution')" />
    </q-tabs>

    <q-separator />

    <span class="text-h2 text-bold text-center q-mt-md">{{ $t('links.login.label.principal') }}</span>

    <q-tab-panels v-model="type" animated>
      <q-tab-panel name="user">
        <LoginUser />
      </q-tab-panel>

      <q-tab-panel name="institution" animated>
        Mundio
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  // Importar internos de Vue.
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Importar componentes
  import LoginUser from '../components/LoginUser.vue'

  // Constantes y variables del componente.
  const $router = useRouter()
  const $route = useRoute()


  // Constantes y variables de la página.
  const type = ref('user')

  // Funciones y métodos
  const changeTypeLogin = (newType) => {
    type.value = newType
    $router.push(`/login/${newType}`)
  }

  onMounted(() => {
    console.clear()

    if ($route.params.type !== 'user' && $route.params.type !== 'institution') {
      $router.push('/login/user')
    }

    changeTypeLogin($route.params.type)
  })
</script>

<style scoped>
  .text-h2 {
    font-family: 'Work Sans', Arial;
    text-transform: capitalize;
  }
</style>
