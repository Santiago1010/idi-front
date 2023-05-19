import { createI18n } from 'vue-i18n'
import messages from './i18n'

var countryCode = navigator.language.split('-')[0];

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: countryCode,
    globalInjection: true,
    fallbackLocale: 'es' // Establece el idioma de respaldo si no se encuentra la traducción
    messages
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}
