<template>
  <q-form @submit.prevent="signupUser">
    <q-card-section class="row">
      <div class="col-12 col-md-4">
        <q-select v-model="userData.institution" outlined class="q-mx-sm" :label="$t('institutionLabel.label')" :hint="$t('institutionLabel.hint')">
          <q-tooltip>{{ $t('institutionLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="home_work" />
          </template>
        </q-select>
      </div>

      <div class="col-12 col-md-8">
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
  import { ref } from 'vue'

  // Importar plugins
  import messages from '@intlify/unplugin-vue-i18n/messages'
  import { i18n } from '../utils/i18n.js'

  // Constantes y vaiables del componente
  const showPassword = ref(false)

  const actualLanguage = localStorage.language

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

  const genresOptions = ref([
    {
      label: messages[actualLanguage].inputs.user.gender.options[0].source,
      value: 'm'
    },
    {
      label: messages[actualLanguage].inputs.user.gender.options[0].source,
      value: 'f'
    }
  ])

  // Métodos y funciones
  const signupUser = () => {
    //
  }

  const limitAgesRange = (date) => {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());

    const selectedDate = new Date(date);

    return selectedDate <= maxDate;
  }
</script>
