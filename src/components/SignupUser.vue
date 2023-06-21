<template>
  <q-form @submit.prevent="signupUser">
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
      <div class="col-12 col-md-6">
        <q-input v-model="userData.phone" outlined type="text" class="q-mx-sm" :label="$t('inputs.user.phone.label')" :hint="$t('inputs.user.phone.hint')" mask="(+##) ### ### ####">
          <q-tooltip>{{ $t('inputs.user.phone.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="contacts" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="userData.email" type="text" class="q-mx-sm" outlined :label="$t('inputs.user.email.label')" :hint="$t('inputs.user.email.hint')">
          <q-tooltip>{{ $t('inputs.user.email.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-6">
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

      <div class="col-12 col-md-6">
        <q-select v-model="userData.gender" outlined :options="genresOptions" class="q-mx-sm" :label="$t('inputs.user.gender.label')" :hint="$t('inputs.user.gender.tooltip')" emit-value map-options>
          <q-tooltip>{{ $t('inputs.user.gender.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="person_3" />
          </template>
        </q-select>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-6">
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

      <div class="col-12 col-md-6">
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

    <q-card-section>
      <div class="col-12">
        <q-editor v-model="userData.aboutMe" :toolbar="toolbar"></q-editor>
      </div>
    </q-card-section>

    <q-card-actions vertical>
      <q-btn type="submit" :label="$t('links.signup.label.principal')" class="long-btn" color="info" icon-right="person_add">
        <q-tooltip>{{ $t('signup.button.tooltip') }}</q-tooltip>
      </q-btn>
    </q-card-actions>

    <q-card-actions class="q-px-xl">
      <q-btn flat style="width: 49%; margin-left: .5%;" to="/recover-password/user" :label="$t('links.recover.label.alternative')"></q-btn>

      <q-btn flat style="width: 49%; margin-right: .5%;" to="/login/user" :label="$t('links.login.label.alternative')">
        <q-tooltip>{{ $t('links.login.tooltip') }}</q-tooltip>
      </q-btn>
    </q-card-actions>
    <LoaderPage />
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
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Importar componentes
  import LoaderPage from './LoaderPage.vue'

  // Importar plugins
  import { i18n } from '../utils/i18n.js'

  // Constantes y vaiables del componente
  const $q = useQuasar();
  const { t: translate } = i18n.global

  const rulesStore = useRulesStore()
  const regexStore = useRegexStore()
  const utilsStore = useUtilsStore()

  const showPassword = ref(false)
  const disabledEmail = ref(true)

  const userData = ref({
    name: null,
    lastName: null,
    gender: null,
    birthday: null,
    email: null,
    phone: null,
    password: null,
    confirm: null,
    avatar: null,
    aboutMe: 'Cuéntanos quién eres'
  })

  const genresOptions = ref([{}])
  const institutionsOptions = ref([{}])
  const campusesOptions = ref([{}])

  const toolbar = ref([
    [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
    ],
    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ['token', 'hr', 'link', 'custom_btn'],
    ['print', 'fullscreen'],
    [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
        ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
        ]
    },
    'removeFormat'
    ],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

    ['undo', 'redo'],
    ['viewsource']
    ]);

  // Métodos y funciones
  const signupUser = () => {
    console.clear()

    utilsStore.setNewLoadersState(true)

    if (userData.value.password !== userData.value.confirm) {
      $q.notify({
        color: 'red-5',
        icon: 'warning',
        message: translate('inputs.user.confirm.error')
      })

      return false
    }

    const newUsersData = {
      name: userData.value.name,
      lastName: usersData.value.lastName,
      gender: usersData.value.gender,
      birthday: usersData.value.birthday,
      email: usersData.value.email,
      phone: usersData.value.phone,
      password: null,
      avatar: usersData.value.avatar,
      aboutMe: usersData.value.aboutMe
    }

    newUsersData.password = setNewPassword(userData.value.password)

    const queries = {
      reason: 'confirm',
      type: 'user'
    }

    publicRoutes.signup(newUsersData, queries).then(response => {
      $q.notify({
        icon: response.data.status === 'success' ? 'check' : 'warning',
        color: response.data.status === 'success' ? 'green-5' : 'red-5',
        message: response.data.message
      })

      if (response.data.status !== 'success') {
        console.log(response.data)
      }

      userData.value = {
        name: null,
        lastName: null,
        gender: null,
        birthday: null,
        email: null,
        phone: null,
        password: null,
        confirm: null,
        avatar: null,
        aboutMe: 'Cuéntanos quién eres'
      }
    }).catch(error => console.error(error)).then(() => {
      utilsStore.setNewLoadersState(false)
    });
  }

  const limitAgesRange = (date) => {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());

    const selectedDate = new Date(date);

    return selectedDate <= maxDate;
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
  })
</script>
