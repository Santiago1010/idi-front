import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import VueI18n from 'vue-i18n'
import router from './routes/router.js'
import { createPinia, PiniaVuePlugin } from 'pinia'

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

/*import es from './utils/locales/es.json'

const i18n = new VueI18n({
  locale: countryCode, // Establece el idioma inicial
  fallbackLocale: 'es', // Establece el idioma de respaldo si no se encuentra la traducción
  messages: {
    es: es,
  },
})*/

import App from './App.vue'

createApp(App)
.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})
//.use(i18n) // Agrega el complemento de VueI18n
.use(createPinia())
.use(router)
.mount('#app')
