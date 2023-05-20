import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.language,
  fallbackLocale: 'es',
  availableLocales: ['de', 'en', 'es', 'fr', 'it', 'pt'],
  messages: messages
});
