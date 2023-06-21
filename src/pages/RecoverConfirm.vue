<template>
  <q-card class="q-ma-lg q-pa-md">
    <div v-if="valid">
      <q-card-section class="text-h2 text-center text-bold">
        {{ reason === 'recover-password' ? $t('links.recover.title') : 'Confirma tu cuenta' }}
      </q-card-section>

      <q-form @submit.prevent="reason === 'recover-password' ? recoverPassword() : confirmAccount()">
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-12 q-px-md">
              <q-input v-model="accountData.code" type="text" class="q-mx-sm" outlined :label="$t('inputs.user.code.label')" :rules="[rulesStore.required, rulesStore.codes.user]" :hint="$t('inputs.user.code.hint')">
                <q-tooltip>{{ $t('inputs.user.code.tooltip') }}</q-tooltip>

                <template v-slot:prepend>
                  <q-icon name="code" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 q-px-md">
              <q-input v-model="accountData.email" type="text" class="q-mx-sm" outlined :label="$t('inputs.user.email.label')" :rules="[rulesStore.required]" :hint="$t('inputs.user.email.hint')">
                <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 q-px-md" :class="reason !== 'confirm' ? 'col-md-6' : 'col-md-12'">
              <q-input v-model="accountData.password" :type="showPassword ? 'text' : 'password'" class="q-mx-sm" outlined :label="$t('inputs.user.password.label')" :rules="[rulesStore.required, rulesStore.password]" :hint="$t('inputs.user.password.hint')" counter>
                <q-tooltip>{{ $t('inputs.user.password.tooltip') }}</q-tooltip>

                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>

                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </div>

            <div v-if="reason !== 'confirm'" class="col-12 col-md-6 q-px-md">
              <q-input v-model="accountData.confirm" :type="showPassword ? 'text' : 'password'" class="q-mx-sm" outlined :label="$t('inputs.user.confirm.label')" :rules="[rulesStore.required]" :hint="$t('inputs.user.confirm.hint')" counter>
                <q-tooltip>{{ $t('inputs.user.confirm.tooltip') }}</q-tooltip>

                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>

                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn type="submit" class="long-btn" color="positive" :label="reason === 'recover-password' ? $t('links.recover.title') : 'Confirma tu cuenta'"></q-btn>
        </q-card-actions>
      </q-form>
    </div>

    <div v-else>
      <p class="text-body1" v-html="$t('valids.invalidToken').replace(`%email%`, `<a href='${templateRecoverToken(token)}'>support@idi.com</a>`)"></p>
    </div>

    <LoaderPage />
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'
  import { publicRoutes } from '../utils/axios.js'
  import { templateRecoverToken } from '../utils/setMailto.js'
  import { setNewPassword } from '../utils/security.js'

  // Importar stores
  import { useRulesStore } from '../stores/RulesStore.js'
  import { useRegexStore } from '../stores/RegexStore.js'
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Importar plugins
  import { i18n } from '../utils/i18n.js'

  // Importar componentes
  import LoaderPage from '../components/LoaderPage.vue'

  // Contantes de la página
  const $q = useQuasar()
  const $router = useRouter()
  const $route = useRoute()
  const reason = ref(null)
  const type = ref(null)
  const token = ref(null)
  const valid = ref(false)
  const { t: translate } = i18n.global

  const rulesStore = useRulesStore()
  const regexStore = useRegexStore()
  const utilsStore = useUtilsStore()

  const accountData = ref({
    code: null,
    email: null,
    password: null,
    confirm: null
  })

  const showPassword = ref(false)

  // Funciones de la página
  const validToken = () => {
    console.clear()

    const queries = {
      reason: $route.params.reason,
      type: type.value
    }

    publicRoutes.validToken(token.value, queries).then(response => {
      console.log(response.data)
      if (response.data.status === 'success') {
        valid.value = true
      } else {
        valid.value = false
      }
    }).catch(error => {
      valid.value = false
    })
  }

  const recoverPassword = () => {
    if (accountData.value.password !== accountData.value.confirm) {
      $q.notify({
        color: 'red-5',
        icon: 'warning',
        message: translate('inputs.user.confirm.error')
      })

      accountData.value.confirm = null

      return false;
    }

    utilsStore.setNewLoadersState(true)

    const newData = accountData.value
    newData.reason = 'recover::password'

    newData.password = setNewPassword(newData.password)
    newData.confirm = setNewPassword(newData.confirm)

    publicRoutes.recoverPassword(type.value, token.value, newData).then(response => {
      $q.notify({
        color: response.data.status === 'success' && response.data.code === 200 ? 'green-5' : 'red-5',
        icon: response.data.status === 'success' && response.data.code === 200 ? 'check' : 'warning',
        message: response.data.message
      })
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    })
  }

  const confirmAccount = () => {
    console.clear()

    utilsStore.setNewLoadersState(true)

    const queries = {
      reason: 'confirm',
      type: type.value
    }

    const accountDataConfirm = {
      code: accountData.value.code,
      email: accountData.value.email,
      password: null
    }

    accountDataConfirm.password = setNewPassword(accountData.value.password)

    publicRoutes.confirmAccount(queries.type, token.value, accountDataConfirm, queries).then(response => {
      $q.notify({
        icon: response.data.status === 'success' ? 'check' : 'warning',
        color: response.data.status === 'success' ? 'green-5' : 'red-5',
        message: response.data.message
      })

      if (response.data.status !== 'success') {
        console.error(response.data)
        return false
      }

      accountData.value = {
        code: null,
        email: null,
        password: null,
        confirm: null
      }

      $router.push(`/login/${type.value}`)
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    })
  }

  onMounted(() => {
    console.clear()

    if (($route.params.reason !== 'recover-password' && $route.params.reason !== 'confirm')
      ||
      ($route.params.type !== 'user' && $route.params.type !== 'institution')) {
      $router.push('/404')
  }

  reason.value = $route.params.reason
  type.value = $route.params.type
  token.value = $route.params.token

  validToken()
})
</script>
