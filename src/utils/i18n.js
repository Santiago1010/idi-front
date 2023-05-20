import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'es',
  fallbackLocale: 'es',
  availableLocales: ['de', 'en', 'es', 'ja', 'pt', 'ru', 'zh'],
  messages: messages
});
