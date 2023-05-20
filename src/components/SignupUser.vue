<template>
  <q-form @submit.prevent="signupUser">
    <q-card-section class="row">
      <div class="col-12 col-md-4">
        <q-select v-model="userData.institution" outlined :label="$t('institutionLabel.label')" :hint="$t('institutionLabel.hint')">
          <q-tooltip>{{ $t('institutionLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="home_work" />
          </template>
        </q-select>
      </div>

      <div class="col-12 col-md-8">
        <q-input v-model="userData.email" type="text" class="q-mx-sm" outlined :label="$t('emailLabel.label')" :hint="$t('emailLabel.hint')">
          <q-tooltip>{{ $t('emailLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-6">
        <q-input v-model="userData.name" outlined type="text" class="q-mx-sm" :label="$t('nameLabel.label')" :hint="$t('nameLabel.hint')">
          <q-tooltip>{{ $t('nameLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="userData.lastName" outlined type="text" class="q-mx-sm" :label="$t('lastNameLabel.label')" :hint="$t('lastNameLabel.hint')">
          <q-tooltip>{{ $t('lastNameLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="group" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 col-md-8">
        <q-input v-model="userData.birthday" outlined type="text" class="q-mx-sm" :label="$t('birthdayLabel.label')" mask="date" :hint="$t('birthdayLabel.hint')">
          <q-tooltip>{{ $t('birthdayLabel.tooltip') }}</q-tooltip>

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
        <q-select v-model="userData.gender" outlined :options="genresOptions" class="q-mx-sm" :label="$t('genderLabel.label')" :hint="$t('genderLabel.tooltip')" emit-value map-options>
          <q-tooltip>{{ $t('genderLabel.tooltip') }}</q-tooltip>

          <template v-slot:prepend>
            <q-icon name="person_3" />
          </template>
        </q-select>
      </div>
    </q-card-section>
  </q-form>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar plugins
  import messages from '@intlify/unplugin-vue-i18n/messages'

  // Constantes y vaiables del componente
  const actualLanguage = localStorage.language

  const userData = ref({
    institution: null,
    name: null,
    lastName: null,
    gender: null,
    birthday: null,
    email: null,
    phone: null,
    password: null
  })

  const genresOptions = ref([
    {
      label: messages[actualLanguage].genres[0].source,
      value: 'm'
    },
    {
      label: messages[actualLanguage].genres[1].source,
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