import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import deQ from 'quasar/lang/de';
import enQ from 'quasar/lang/en-GB';
import esQ from 'quasar/lang/es';
import jaQ from 'quasar/lang/ja';
import ptQ from 'quasar/lang/pt';
import ruQ from 'quasar/lang/ru';
// import zhQ from 'quasar/lang/zh-CN';

const langPacks = {
  de: deQ,
  'en-GB': enQ,
  es: esQ,
  ja: jaQ,
  pt: ptQ,
  ru: ruQ,
  // 'zh-CN': zhQ,
};

export function useLocaleSwitcher() {
  const locale = ref('es');

  const $q = useQuasar();
  const i18n = useI18n({useScope: 'global'});

  function setLocale(lang) {
    locale.value = lang;
    i18n.locale.value = lang;
    $q.lang.set(langPacks[lang]);
    localStorage.setItem('language', lang);
  }

  function loadLastState(name) {
    const prevState = localStorage.getItem('language');
    setLocale(prevState || 'es');
  }

  return {
    locale,
    setLocale,
    loadLastState,
  };
}
