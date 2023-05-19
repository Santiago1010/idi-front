import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import { createI18n } from 'vue-i18n'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'

// A few examples for animations from Animate.css:
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import general styles
import './style.css'

var countryCode = navigator.language.split('-')[0];

const i18n = createI18n({
  locale: countryCode, // Establece el idioma inicial
  fallbackLocale: 'es', // Establece el idioma de respaldo si no se encuentra la traducción
  messages: {
    es: require('./utils/locales/es.json'),
  },
})

import App from './App.vue'

createApp(App)
.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})
.use(i18n) // Agrega el complemento de VueI18n
.mount('#app')
