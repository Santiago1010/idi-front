import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

import pinia from '../stores'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.language,
  fallbackLocale: 'es',
  availableLocales: ['de', 'en', 'es', 'ja', 'pt', 'ru', 'zh'],
  messages: messages
});
