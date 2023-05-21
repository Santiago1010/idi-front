import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/es'
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

import './assets/styles/css/styles.css'

import { i18n } from './utils/i18n.js'

import App from './App.vue'

createApp(App)
.use(createPinia())
.use(Quasar, {
  plugins: {
    Notify
  },
  lang: quasarLang,
})
.use(router)
.use(i18n)
.mount('#app')
