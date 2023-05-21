<template>
  <q-form @submit.prevent="signupUser">
    <q-card-section class="row">
      <div class="col-12 col-md-4">
        <q-select v-model="userData.institution" outlined :options="institutionsOptions" class="q-mx-sm" :label="$t('inputs.institution.name.label')" :hint="$t('inputs.institution.name.hint')" @update:model-value="getEmailExtensions" emit-value map-options>
          <q-tooltip>{{ $t('inputs.institution.name.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="home_work" />
          </template>
        </q-select>
      </div>

      <div class="col-12 col-md-8">
        <q-input v-model="userData.email" type="text" class="q-mx-sm" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')" :rules="[rulesStore.email]" :disable="disabledEmail">
          <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-6">
        <q-input v-model="userData.name" outlined type="text" class="q-mx-sm" :label="$t('inputs.user.name.label')" :hint="$t('inputs.user.name.hint')">
          <q-tooltip>{{ $t('inputs.user.name.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="userData.lastName" outlined type="text" class="q-mx-sm" :label="$t('inputs.user.lastName.label')" :hint="$t('inputs.user.lastName.hint')">
          <q-tooltip>{{ $t('inputs.user.lastName.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="group" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-8">
        <q-input v-model="userData.birthday" outlined type="text" class="q-mx-sm" :label="$t('inputs.user.birthday.label')" mask="date" :hint="$t('inputs.user.birthday.hint')">
          <q-tooltip>{{ $t('inputs.user.birthday.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="cake" />
          </template>

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="userData.birthday" :options="limitAgesRange">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="guardar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-4">
        <q-select v-model="userData.gender" outlined :options="genresOptions" class="q-mx-sm" :label="$t('inputs.user.gender.label')" :hint="$t('inputs.user.gender.tooltip')" emit-value map-options>
          <q-tooltip>{{ $t('inputs.user.gender.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="person_3" />
          </template>
        </q-select>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-4">
        <q-input v-model="userData.phone" outlined type="text" class="q-mx-sm" :label="$t('inputs.user.phone.label')" :hint="$t('inputs.user.phone.hint')" mask="(+##) ### ### ####">
          <q-tooltip>{{ $t('inputs.user.phone.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="contacts" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-4">
        <q-input v-model="userData.password" :type="showPassword ? 'text' : 'password'" class="q-mx-sm" outlined :label="$t('inputs.user.password.label')" :hint="$t('inputs.user.password.hint')" counter>
          <q-tooltip>{{ $t('inputs.user.password.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="password" />
          </template>

          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-4">
        <q-input v-model="userData.confirm" :type="showPassword ? 'text' : 'password'" class="q-mx-sm" outlined :label="$t('inputs.user.confirm.label')" :hint="$t('inputs.user.confirm.hint')" counter>
          <q-tooltip>{{ $t('inputs.user.confirm.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="password" />
          </template>

          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-actions vertical>
      <q-btn type="submit" :label="$t('links.signup.label.principal')" class="long-btn" color="info" icon-right="person_add">
        <q-tooltip>{{ $t('signup.button.tooltip') }}</q-tooltip>
      </q-btn>
    </q-card-actions>

    <q-card-actions class="q-px-xl">
      <q-btn flat style="width: 49%; margin-left: .5%;" :label="$t('links.recover.label.alternative')"></q-btn>

      <q-btn flat style="width: 49%; margin-right: .5%;" :label="$t('links.login.label.alternative')">
        <q-tooltip>{{ $t('links.login.tooltip') }}</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-form>
</template>

<script setup>
  // Importar internos de vue
  import { ref, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { publicRoutes } from '../utils/axios.js'
  import { setNewPassword } from '../utils/security.js'

  // Importar stores
  import { useRulesStore } from '../stores/RulesStore.js'
  import { useRegexStore } from '../stores/RegexStore.js'

  // Importar plugins
  import { i18n } from '../utils/i18n.js'

  // Constantes y vaiables del componente
  const $q = useQuasar();
  const { t: translate } = i18n.global

  const rulesStore = useRulesStore()
  const regexStore = useRegexStore()

  const showPassword = ref(false)
  const disabledEmail = ref(true)

  const userData = ref({
    institution: null,
    name: null,
    lastName: null,
    gender: null,
    birthday: null,
    email: null,
    phone: null,
    password: null,
    confirm: null,
  })

  const genresOptions = ref([{}])
  const institutionsOptions = ref([{}])

  // Métodos y funciones
  const signupUser = () => {
    console.clear()

    if (userData.value.password !== userData.value.confirm) {
      $q.notify({
        color: 'red-5',
        icon: 'warning',
        message: translate('inputs.user.confirm.error')
      })

      return false
    }

    //userData.value.password = setNewPassword(userData.value.password)
    console.log(userData.value.institution)
  }

  const readAllInstitutions = () => {
    console.clear()

    publicRoutes.readInstitutions().then(response => {
      response.data.data.map((institution, index) => {
        institutionsOptions.value[index].label = institution.name
        institutionsOptions.value[index].value = institution.id
        institutionsOptions.value[index].extensions = institution.extensions
      })
    }).catch(error => console.error(error)).then(() => {})
  }

  const limitAgesRange = (date) => {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());

    const selectedDate = new Date(date);

    return selectedDate <= maxDate;
  }

  const getEmailExtensions = () => {
    console.clear()

    const extensions = institutionsOptions.value.filter(
      institution => institution.value === userData.value.institution
    )[0].extensions

    regexStore.setValidExtensions(extensions)

    disabledEmail.value = false
  }

  onMounted(() => {
    genresOptions.value = [
      {
        label: translate('inputs.user.gender.options[0]'),
        value: 'm'
      },
      {
        label: translate('inputs.user.gender.options[1]'),
        value: 'f'
      }
    ]

    readAllInstitutions()
  })
</script>
