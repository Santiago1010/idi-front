import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'es', // Will be reset in App.vue
  fallbackLocale: 'es',
  availableLocales: ['de', 'en-GB', 'es', 'ja', 'pt', 'ru', 'zh-CN'],
  messages: messages,
});
